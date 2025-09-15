import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Sweets by Dani</h3>
          <p className="text-sm text-primary-foreground/80">
            Handcrafted cookies made with love for every occasion.
            Specializing in custom orders for parties and events.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Twitter size={24} />
          </a>
        </div>

        <div className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} Sweets by Dani. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;