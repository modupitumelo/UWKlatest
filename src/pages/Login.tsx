import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const location = useLocation();
  
  return (
    <div className="bg-neutral-100 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-semibold mb-2">Welcome to Umnotho Wasekasi</h1>
          <p className="text-neutral-600">
            {location.state?.redirectTo 
              ? 'Please log in or register to continue with your purchase.' 
              : 'Sign in to your account or create a new one to get started.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-primary-900 opacity-70 rounded-lg"></div>
            <img 
              src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Luxury Home" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
              <h2 className="text-2xl font-serif font-semibold mb-4">Win Your Dream Home</h2>
              <p className="text-center mb-6">
                Join thousands of others who have already secured their chance to win a luxurious property.
              </p>
              <div className="space-y-4 w-full">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Prizes valued over R2 million</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Transparent draw process</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b border-neutral-200">
                <button 
                  className={`flex-1 py-4 text-center font-medium ${activeTab === 'login' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500'}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`flex-1 py-4 text-center font-medium ${activeTab === 'register' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500'}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
            
            <div className="mt-6 text-center text-neutral-600 text-sm">
              <p>
                By signing in or creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary-600 hover:underline">Terms & Conditions</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;