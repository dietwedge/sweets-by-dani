import { mockCookies } from "@/data/mock-cookies";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import { useCart } from "@/context/CartContext"; // Import useCart

const Index = () => {
  const featuredCookies = mockCookies.filter(cookie => cookie.isFeatured);
  const { addToCart } = useCart(); // Use addToCart from context

  return (
    <>
      <HeroSection />
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-primary mb-4">Welcome to Sweets by Dani!</h1>
          <p className="text-xl text-muted-foreground">
            Indulge in our freshly baked, delightful cookies.
          </p>
        </div>

        <section className="w-full max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Our Featured Delights</h2>
          <div className="space-y-16"> {/* Increased space between featured items */}
            {featuredCookies.map((cookie, index) => (
              <div
                key={cookie.id}
                className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg shadow-lg bg-card text-card-foreground ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2">
                  <img
                    src={cookie.imageUrl}
                    alt={cookie.name}
                    className="w-full h-72 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <h3 className="text-4xl font-bold text-primary mb-4">{cookie.name}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{cookie.description}</p>
                  <p className="text-2xl font-extrabold text-foreground mb-6">${cookie.price.toFixed(2)}</p>
                  <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <Button asChild size="lg">
                      <Link to={`/cookie/${cookie.id}`}>View Details</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => addToCart(cookie, 1)}
                      disabled={!cookie.isAvailable}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactForm />
      </div>
    </>
  );
};

export default Index;