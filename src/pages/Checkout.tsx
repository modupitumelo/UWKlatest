import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/payment/CheckoutForm';
import { Ticket } from '../types';

const tickets: Ticket[] = [
  {
    id: '1',
    title: 'R1.1 Million Dream Home',
    description: 'First prize winner! Choose your dream home at any location valued at R1.1 million. This is your chance to own your perfect home in your preferred area.',
    price: 299,
    image: '/1st.jpg',
    type: 'premium'
  },
  {
    id: '2',
    title: 'R600,000 Home Build',
    description: 'Second prize winner! We will build your dream home valued at R600,000. Perfect opportunity to get your ideal home built to your specifications.',
    price: 199,
    image: '/2nd.jpg',
    type: 'standard'
  },
  {
    id: '3',
    title: 'R350,000 Building Materials',
    description: 'Third prize winner! Get complete building materials for your dream home valued at R350,000. Everything you need to start building your future.',
    price: 99,
    image: '/3rd.jpg',
    type: 'basic'
  },
  {
    id: '4',
    title: 'Win R10,000 Cash',
    description: 'Instant cash prize! Get R10,000 deposited directly into your bank account. Use it however you want - for home improvements, furniture, or savings.',
    price: 10,
    image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
    type: 'cash'
  }
];

const CheckoutPage: React.FC = () => {
  const { ticketType } = useParams<{ ticketType: string }>();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const ticket = tickets.find(t => t.type === ticketType);
    if (!ticket) {
      navigate('/prizes');
      return;
    }
    setSelectedTicket(ticket);
  }, [ticketType, navigate]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate('/login', { state: { redirectTo: `/checkout/${ticketType}` } });
    }
  }, [user, loading, navigate, ticketType]);

  if (loading || !selectedTicket) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-semibold mb-8 text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <CheckoutForm selectedTicket={selectedTicket} />
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={selectedTicket.image} 
                  alt={selectedTicket.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{selectedTicket.title}</h2>
                  <p className="text-neutral-600 mb-4">{selectedTicket.description}</p>
                  <div className="font-bold text-xl text-primary-600 mb-4">
                    R{selectedTicket.price.toFixed(2)}
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-4">
                    <h3 className="font-medium mb-2">What happens next?</h3>
                    <ul className="text-sm text-neutral-600 space-y-2">
                      <li>• You'll receive a confirmation email with your ticket details</li>
                      <li>• Tickets will be entered into the next draw</li>
                      <li>• Winners will be announced at our official event</li>
                      <li>• You'll be notified if you win</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;