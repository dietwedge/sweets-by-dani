import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

const OrderConfirmation = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the order confirmation page is loaded
    clearCart();
  }, [clearCart]);

  return (
    <div className="py-8 max-w-2xl mx-auto text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-extrabold text-primary mb-4">Order Confirmed!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Thank you for your purchase! Your order has been successfully placed.
        You will receive an email confirmation shortly.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;