import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/context/SessionContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useSession();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('venmo'); // Default to Venmo

  const handleCompleteOrder = async () => {
    console.log("handleCompleteOrder called.");
    console.log("Current user:", user);
    console.log("Cart items:", cart);
    console.log("Cart total:", cartTotal);

    if (!user) {
      toast.error("You must be logged in to place an order.");
      navigate('/login');
      console.log("Redirecting to login because user is not logged in.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      navigate('/');
      console.log("Redirecting to home due to empty cart.");
      return;
    }

    try {
      console.log("Attempting to create order in Supabase...");
      // 1. Create the order in the 'orders' table
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: cartTotal,
          status: 'pending', // Initial status
          payment_method: selectedPaymentMethod,
          payment_status: 'pending', // Initial payment status
        })
        .select()
        .single();

      if (orderError || !orderData) {
        console.error("Supabase order creation error:", orderError);
        throw new Error(orderError?.message || "Failed to create order.");
      }

      const orderId = orderData.id;
      console.log("Order created successfully with ID:", orderId);
      console.log("Order data:", orderData);

      // 2. Create order items in the 'order_items' table
      console.log("Attempting to create order items in Supabase...");
      const orderItems = cart.map(item => ({
        order_id: orderId,
        cookie_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      console.log("Order items to insert:", orderItems);

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) {
        console.error("Supabase order items creation error:", orderItemsError);
        throw new Error(orderItemsError?.message || "Failed to create order items.");
      }
      console.log("Order items created successfully.");

      // 3. Clear the cart and navigate to confirmation
      clearCart();
      toast.success("Order placed successfully!");
      console.log("Cart cleared. Navigating to order confirmation.");
      navigate("/order-confirmation", { state: { orderId, paymentMethod: selectedPaymentMethod } });

    } catch (error: any) {
      console.error("Error completing order:", error.message);
      toast.error(`Failed to place order: ${error.message}`);
    }
  };

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-6">Checkout</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        Review your order and select your payment method.
      </p>

      <div className="bg-card shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Order Summary</h2>
        <div className="space-y-3 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center text-lg">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-2xl font-bold text-foreground border-t pt-4">
          <span>Order Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-card shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Payment Method</h2>
        <RadioGroup
          defaultValue={selectedPaymentMethod}
          onValueChange={setSelectedPaymentMethod}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="venmo" id="venmo" />
            <Label htmlFor="venmo" className="text-lg font-medium">Venmo</Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="cashapp" id="cashapp" />
            <Label htmlFor="cashapp" className="text-lg font-medium">CashApp</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild variant="outline">
          <Link to="/cart">
            <span className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </span>
          </Link>
        </Button>
        <Button onClick={handleCompleteOrder} disabled={cartTotal === 0 || !user}> {/* Re-enabled disabled prop */}
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;