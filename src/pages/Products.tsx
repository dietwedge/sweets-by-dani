import React from "react";
import { mockCookies } from "@/data/mock-cookies";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext"; // Import useCart

const Products = () => {
  const { addToCart } = useCart(); // Use addToCart from context

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary mb-4">Our Delicious Cookies</h1>
        <p className="text-lg text-muted-foreground">
          Explore our full range of freshly baked delights.
        </p>
      </div>

      <section className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCookies.map(cookie => (
            <Card key={cookie.id} className="flex flex-col justify-between">
              <Link to={`/cookie/${cookie.id}`}>
                <CardHeader>
                  <img src={cookie.imageUrl} alt={cookie.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <CardTitle className="text-2xl font-semibold">{cookie.name}</CardTitle>
                  <CardDescription>{cookie.description}</CardDescription>
                </CardHeader>
              </Link>
              <CardContent>
                <p className="text-xl font-bold text-primary">${cookie.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addToCart(cookie, 1)} disabled={!cookie.isAvailable}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;