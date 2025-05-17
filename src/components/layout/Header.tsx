import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Umnotho Wasekasi Logo" className="h-10" />
          <div className="ml-3">
            <h1 className="text-xl font-serif font-semibold text-primary-800">Umnotho Wasekasi</h1>
            <p className="text-xs text-neutral-600">Win Your Dream Home</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link to="/prizes" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Prizes
          </Link>
          <Link to="/about" className="text-neutral-700 hover:text-primary-600 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Contact
          </Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                <User size={18} className="mr-1" />
                <span>Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right invisible group-hover:visible">
                <Link to="/dashboard" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700">
                  Dashboard
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700">
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Login / Register
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-700"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/prizes" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
              Prizes
            </Link>
            <Link to="/about" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
              Contact
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/profile" className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100" onClick={toggleMenu}>
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="text-left text-neutral-700 hover:text-primary-600 transition-colors py-2 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors inline-block"
                onClick={toggleMenu}
              >
                Login / Register
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;