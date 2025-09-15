import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCompleteOrder = () => {
    // In a real application, you would process payment and create an order here.
    // For now, we'll just navigate to the confirmation page and clear the cart.
    navigate("/order-confirmation");
  };

  return (
    <div className="py-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-primary mb-6">Checkout</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This is where you would complete your purchase.
        Full payment processing and order finalization will be implemented here.
      </p>
      <div className="text-2xl font-bold text-foreground mb-6">
        Order Total: ${cartTotal.toFixed(2)}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild variant="outline">
          <Link to="/cart">
            <span className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </span>
          </Link>
        </Button>
        <Button onClick={handleCompleteOrder} disabled={cartTotal === 0}>
          Complete Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;