import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Umnotho Wasekasi</h3>
            <p className="text-neutral-300 mb-4">
              Transforming lives through our property prize draws. Your ticket could be your gateway to homeownership.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-secondary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-secondary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-secondary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/prizes" className="text-neutral-300 hover:text-white transition-colors">
                  Prizes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-neutral-300 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-primary-400" />
                <span className="text-neutral-300">+27 69 876 8186</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-primary-400" />
                <a href="mailto:info@uwkfoundation.com" className="text-neutral-300 hover:text-white transition-colors">
                  info@uwkfoundation.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-primary-400" />
                <span className="text-neutral-300">South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-6 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Umnotho Wasekasi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;