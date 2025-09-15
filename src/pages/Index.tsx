import { mockCookies } from "@/data/mock-cookies";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection"; // Import the new HeroSection

const Index = () => {
  const featuredCookies = mockCookies.filter(cookie => cookie.isFeatured);

  return (
    <>
      <HeroSection /> {/* Add the HeroSection here */}
      <div className="py-8"> {/* Adjusted main div for content flow */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-primary mb-4">Welcome to Sweets by Dani!</h1>
          <p className="text-xl text-muted-foreground">
            Indulge in our freshly baked, delightful cookies.
          </p>
        </div>

        <section className="w-full max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Our Featured Delights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCookies.map(cookie => (
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
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;