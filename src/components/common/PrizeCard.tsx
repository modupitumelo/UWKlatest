import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket } from '../../types';

interface PrizeCardProps {
  prize: Ticket;
  index: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ prize, index }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={prize.image}
          alt={prize.title} 
          className="w-full h-64 object-cover" 
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-2 text-sm font-bold rounded-bl-lg">
          R{prize.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-2">{prize.title}</h3>
        <p className="text-neutral-600 mb-6">{prize.description}</p>
        
        <Link 
          to={`/checkout/${prize.type}`}
          className="block w-full bg-primary-600 text-white text-center py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
        >
          Buy Ticket Now
        </Link>
      </div>
    </motion.div>
  );
};

export default PrizeCard;