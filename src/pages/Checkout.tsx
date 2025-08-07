import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  return (
    <div className="py-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-primary mb-6">Checkout</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This is where you would complete your purchase.
        Full payment processing and order finalization will be implemented here.
      </p>
      <Button asChild>
        <Link to="/cart">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Link>
      </Button>
    </div>
  );
};

export default Checkout;