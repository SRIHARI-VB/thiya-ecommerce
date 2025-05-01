
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-boutique-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-boutique-700">Thiya's Boutique</h3>
            <p className="text-gray-600 text-sm">
              Curated fashion and lifestyle boutique bringing exclusive, high-quality products
              to discerning customers who value quality and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-boutique-700">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/women" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/categories/men" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/categories/accessories" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-boutique-700">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-boutique-500 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-boutique-500 text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-boutique-700">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-boutique-500"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-boutique-500"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-boutique-500"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            <div className="text-sm text-gray-600">
              <p>Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-boutique-300 flex-grow text-sm"
                />
                <button
                  type="button"
                  className="bg-boutique-600 text-white px-4 py-2 rounded-r-md hover:bg-boutique-700 text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Thiya's Boutique. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-boutique-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-boutique-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
