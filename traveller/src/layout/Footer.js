import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-sky-500 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Stay Connected</h2>
            <p className="mt-2">Follow us on social media for the latest updates.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/about" className="mx-4 hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="mx-4 hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="mx-4 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
