import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import useCart

const Navbar = () => {
  const { cartItemCount } = useCart(); // Use the cartItemCount from context

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          🍪 Sweets by Dani
        </Link>
        <div className="flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/products">Shop</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cartItemCount}) {/* Display cart item count */}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/admin">
              <User className="mr-2 h-4 w-4" /> Admin
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;