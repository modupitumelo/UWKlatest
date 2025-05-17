import React from 'react';
import { motion } from 'framer-motion';
import PrizeCard from '../components/common/PrizeCard';
import { Ticket } from '../types';

const prizes: Ticket[] = [
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

const PrizesPage: React.FC = () => {
  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-serif font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Amazing Prizes
          </motion.h1>
          <motion.p 
            className="text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose from three life-changing options. The more tickets you buy, the higher your chances of winning!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {prizes.map((prize, index) => (
            <PrizeCard key={prize.id} prize={prize} index={index} />
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How are winners selected?</h3>
              <p className="text-neutral-600 mb-4">
                Winners are selected through a live draw at an official UWK Foundation event. The selection process is transparent and fair to ensure all participants have an equal chance.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">When is the next draw?</h3>
              <p className="text-neutral-600 mb-4">
                The next draw date will be announced on our website and via email to all ticket holders. Make sure to check your emails regularly for updates.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Can I buy multiple tickets?</h3>
              <p className="text-neutral-600 mb-4">
                Yes! You can purchase as many tickets as you'd like. The more tickets you have, the higher your chances of winning.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What if I win but don't want the specific prize?</h3>
              <p className="text-neutral-600 mb-4">
                Winners have options! You can choose between a pre-selected dream home, a custom-built home, or building materials depending on your needs and preferences.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">How do I claim my prize if I win?</h3>
              <p className="text-neutral-600 mb-4">
                Winners will be contacted directly using the contact information provided during ticket purchase. We will guide you through the prize claiming process.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Are ticket purchases refundable?</h3>
              <p className="text-neutral-600 mb-4">
                All ticket purchases are final. No refunds or cancellations will be allowed as per our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesPage;