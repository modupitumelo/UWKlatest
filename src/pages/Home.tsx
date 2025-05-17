import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home as HomeIcon, Award, Package } from 'lucide-react';
import PrizeCard from '../components/common/PrizeCard';
import CountdownTimer from '../components/CountdownTimer';
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

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center bg-black text-white"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Win Your Dream Home
              <span className="block text-secondary-400">For Just R299</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Purchase a ticket today and get a chance to win a luxurious home valued at R1.1 million, have a dream home built, or receive building materials to start your journey to homeownership.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <Link 
                to="/prizes" 
                className="bg-secondary-500 hover:bg-secondary-600 text-black px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors"
              >
                View Prizes <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-center text-xl mb-4">Time Remaining Until Draw</p>
              <CountdownTimer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prize Showcase Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Amazing Prizes
            </motion.h2>
            <motion.p 
              className="text-neutral-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose from three life-changing options. The more tickets you buy, the higher your chances of winning!
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prizes.map((prize, index) => (
              <PrizeCard key={prize.id} prize={prize} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-white">How It Works</h2>
            <p className="text-primary-200 max-w-2xl mx-auto">
              Our process is simple, transparent, and designed to give everyone a fair chance to win.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-black w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-secondary-400 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Choose Your Ticket</h3>
              <p className="text-primary-200">
                Select from our three ticket options based on your preference and budget.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-black w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-secondary-400 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Make Your Purchase</h3>
              <p className="text-primary-200">
                Complete your secure payment through our platform. You'll receive a confirmation email.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-black w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-secondary-400 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Await the Draw</h3>
              <p className="text-primary-200">
                Winners are selected at our official draw event. You don't need to be present to win.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-white">Why Choose Us</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Umnotho Wasekasi is committed to transforming lives through our property prize draws.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <HomeIcon className="w-12 h-12 text-secondary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Legitimate Opportunity</h3>
              <p className="text-neutral-400">
                We're a registered company operating with full transparency. All draws are conducted fairly and openly.
              </p>
            </div>
            
            <div className="bg-neutral-900 p-6 rounded-lg">
              <Award className="w-12 h-12 text-secondary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Quality Prizes</h3>
              <p className="text-neutral-400">
                Our prizes are valuable and life-changing. We ensure all properties and materials are of the highest quality.
              </p>
            </div>
            
            <div className="bg-neutral-900 p-6 rounded-lg">
              <Package className="w-12 h-12 text-secondary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Community Impact</h3>
              <p className="text-neutral-400">
                A portion of our proceeds goes to community development initiatives that make a positive difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-200">
            Don't miss this opportunity to win your dream home. Purchase your ticket today and take the first step towards homeownership.
          </p>
          <Link 
            to="/prizes" 
            className="bg-secondary-500 hover:bg-secondary-600 text-black px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors"
          >
            Buy Tickets Now <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;