import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/images/hero-banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Taste the Sweetness!
        </h2>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          Handcrafted cookies made with love, just for you.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;