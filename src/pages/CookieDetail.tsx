import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockCookies } from "@/data/mock-cookies";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import useCart

const CookieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cookie = mockCookies.find(c => c.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use addToCart from context

  if (!cookie) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Cookie Not Found</h1>
        <p className="text-lg text-gray-600">The cookie you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(cookie, quantity);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
      </Button>

      <Card className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={cookie.imageUrl} alt={cookie.name} className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold mb-2">{cookie.name}</CardTitle>
              <CardDescription className="text-lg">{cookie.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mb-6">
              <p className="text-3xl font-extrabold text-primary mb-4">${cookie.price.toFixed(2)}</p>
              <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
              <p className="text-muted-foreground mb-4">{cookie.ingredients.join(", ")}</p>
              <h3 className="text-xl font-semibold mb-2">Allergens:</h3>
              <p className="text-destructive-foreground">{cookie.allergens.join(", ")}</p>
              {cookie.isAvailable ? (
                <p className="text-green-600 font-medium mt-4">In Stock</p>
              ) : (
                <p className="text-red-600 font-medium mt-4">Out of Stock</p>
              )}
            </CardContent>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full mt-4" onClick={handleAddToCart} disabled={!cookie.isAvailable}>
            Add {quantity} to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieDetail;