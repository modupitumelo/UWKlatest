import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  orderId: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
}

const PurchaseSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  if (!state?.orderId) {
    return <Navigate to="/" />;
  }
  
  const ticketTypeToLabel = (type: string) => {
    switch (type) {
      case 'premium':
        return 'R1.1 Million Dream Home';
      case 'standard':
        return 'R600,000 Home Build';
      case 'basic':
        return 'R350,000 Building Materials';
      default:
        return type;
    }
  };
  
  return (
    <div className="bg-neutral-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 p-6 text-white text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-semibold">Payment Successful!</h1>
          </div>
          
          <div className="p-8">
            <p className="text-neutral-600 mb-6 text-center">
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
            
            <div className="bg-neutral-50 p-6 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Order ID:</span>
                  <span className="font-medium">{state.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ticket Type:</span>
                  <span className="font-medium">{ticketTypeToLabel(state.ticketType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Quantity:</span>
                  <span className="font-medium">{state.quantity}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="text-neutral-800 font-semibold">Total Amount:</span>
                  <span className="font-bold text-primary-600">R{state.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
              <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                <li>A confirmation email has been sent to your registered email address</li>
                <li>Your tickets are now entered into our next prize draw</li>
                <li>You will be notified via email before the draw takes place</li>
                <li>Keep an eye on our website for draw date announcements</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard" 
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors text-center"
              >
                View My Tickets
              </Link>
              <Link 
                to="/" 
                className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;