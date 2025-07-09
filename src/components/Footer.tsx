
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">D'Kopi</h3>
            <p className="text-gray-300 mb-4">
              Premium coffee powder for coffee enthusiasts. Ethically sourced and carefully roasted.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-coffee-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-coffee-accent transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-coffee-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-coffee-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-medium text-lg mb-4">Contact Us</h4>
            <address className="text-gray-300 not-italic">
              <p>Jl. Sengkaling</p>
              <p>Malang, Indonesia</p>
              <p className="mt-2">Email: info@dkopi.com</p>
              <p>Phone: +62 (021) 123-4567</p>
            </address>
            
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Follow Us</h5>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-coffee-accent transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-coffee-accent transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-coffee-accent transition-colors"
                >
                  {/* Custom TikTok icon since it's not available in lucide-react */}
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} D'Kopi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
