import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPayment } from '../../services/yoco';
import { createTicketOrder, createProfile, getProfile, updateProfile, updateTicketOrder } from '../../services/supabase';
import { sendPurchaseConfirmation } from '../../services/email';
import { Ticket, UserDetails } from '../../types';
import { useForm } from 'react-hook-form';

interface CheckoutFormProps {
  selectedTicket: Ticket;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedTicket }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();

  const totalAmount = selectedTicket.price * quantity;

  const getValidTicketType = (type: string): 'premium' | 'standard' | 'basic' => {
    const typeMap: Record<string, 'premium' | 'standard' | 'basic'> = {
      cash: 'basic',
      premium: 'premium',
      standard: 'standard',
      basic: 'basic'
    };
    return typeMap[type.toLowerCase()];
  };

  const onSubmit = async (formData: UserDetails) => {
    setError(null);
    setLoading(true);

    if (!user) {
      navigate('/login', { state: { from: `/checkout/${selectedTicket.type}` } });
      return;
    }

    let orderId: string | null = null;

    try {
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await getProfile(user.id);

      if (profileCheckError) {
        throw new Error('Failed to check user profile');
      }

      const profileData = {
        id: user.id,
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode
      };

      let profileError;

      if (existingProfile) {
        const { error: updateError } = await updateProfile(user.id, profileData);
        profileError = updateError;
      } else {
        const { error: createError } = await createProfile(profileData);
        profileError = createError;
      }

      if (profileError) {
        throw new Error('Failed to save user details');
      }

      const validTicketType = getValidTicketType(selectedTicket.type);
      
      if (!validTicketType) {
        throw new Error('Invalid ticket type');
      }

      // Create pending order
      const { error: orderError, data: orderData } = await createTicketOrder(
        validTicketType,
        quantity,
        user.id
      );

      if (orderError) {
        throw new Error('Failed to create order');
      }

      if (!orderData || orderData.length === 0) {
        throw new Error('No order data received');
      }

      orderId = orderData[0].id;
      const description = `${quantity}x ${selectedTicket.title} Ticket${quantity > 1 ? 's' : ''}`;
      
      try {
        const { success, transactionId } = await createPayment(
          totalAmount,
          description
        );

        if (success && transactionId) {
          // Update order with transaction ID and completed status
          const { error: updateOrderError } = await updateTicketOrder(
            orderId,
            transactionId,
            'completed'
          );

          if (updateOrderError) {
            throw new Error('Failed to update order status');
          }

          // Send confirmation emails
          await sendPurchaseConfirmation({
            to: formData.email,
            firstName: formData.firstName,
            ticketType: selectedTicket.title,
            quantity,
            totalAmount,
            orderId: transactionId,
            userDetails: formData
          });

          // Navigate to success page
          navigate('/purchase-success', {
            state: {
              orderId: transactionId,
              ticketType: selectedTicket.type,
              quantity,
              totalAmount
            }
          });
        }
      } catch (paymentError: any) {
        // Cancel the order if payment fails
        if (orderId) {
          await updateTicketOrder(orderId, null, 'cancelled');
        }
        throw paymentError;
      }
    } catch (err: any) {
      // If order exists but wasn't updated, ensure it's cancelled
      if (orderId) {
        await updateTicketOrder(orderId, null, 'cancelled').catch(console.error);
      }
      setError(err.message || 'An error occurred during checkout');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-serif font-semibold mb-6">Secure Checkout</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { 
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-\s()]{10,}$/,
                message: "Please enter a valid phone number"
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              {...register("postalCode", { required: "Postal code is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Ticket:</span>
            <span>{selectedTicket.title}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Price per ticket:</span>
            <span>R{selectedTicket.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Quantity:</span>
            <div className="flex items-center">
              <button
                type="button"
                className="border border-neutral-300 w-8 h-8 flex items-center justify-center rounded-l"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-12 h-8 border-t border-b border-neutral-300 text-center"
              />
              <button
                type="button"
                className="border border-neutral-300 w-8 h-8 flex items-center justify-center rounded-r"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span>R{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-neutral-600">
              I agree to the <a href="/terms" className="text-primary-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className=\"text-primary-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-70"
        >
          {loading ? 'Processing...' : `Pay R${totalAmount.toFixed(2)}`}
        </button>
        
        <p className="text-center text-sm text-neutral-500 mt-4">
          Your payment is securely processed by Yoco.
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;