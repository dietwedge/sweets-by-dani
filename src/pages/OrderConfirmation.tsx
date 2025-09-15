import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/db'; // Assuming Order type exists
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

const OrderConfirmation = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const { orderId, paymentMethod } = location.state || {};
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear the cart when the order confirmation page is loaded
    clearCart();

    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("No order ID provided. Please go back to checkout.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, cookies(name, imageUrl))')
        .eq('id', orderId)
        .single();

      if (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to load order details.");
        setError("Failed to load order details.");
      } else {
        setOrder(data as Order);
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [clearCart, orderId]);

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!order) {
    return (
      <div className="py-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-4">Order Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find details for this order. Please try again or contact support.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  const renderPaymentInstructions = () => {
    switch (paymentMethod) {
      case 'venmo':
        return (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Venmo Payment Instructions</h3>
            <p className="text-blue-700">
              Please send <span className="font-bold">${order.total_amount.toFixed(2)}</span> to our Venmo handle: <span className="font-bold">@SweetsByDani</span>.
            </p>
            <p className="text-blue-700 mt-2">
              Your order will be processed once payment is confirmed. You will receive an email update.
            </p>
          </div>
        );
      case 'cashapp':
        return (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-xl font-semibold text-green-800 mb-2">CashApp Payment Instructions</h3>
            <p className="text-green-700">
              Please send <span className="font-bold">${order.total_amount.toFixed(2)}</span> to our CashApp Cashtag: <span className="font-bold">$SweetsByDani</span>.
            </p>
            <p className="text-green-700 mt-2">
              Your order will be processed once payment is confirmed. You will receive an email update.
            </p>
          </div>
        );
      case 'stripe':
      default:
        return (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Credit Card Payment</h3>
            <p className="text-purple-700">
              Your order has been placed. A secure payment link will be sent to your email shortly to complete the payment via Stripe.
            </p>
            <p className="text-purple-700 mt-2">
              Your order will be processed once payment is confirmed.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="py-8 max-w-2xl mx-auto text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-extrabold text-primary mb-4">Order Confirmed!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Thank you for your purchase! Your order has been successfully placed.
      </p>

      <Card className="mb-8 shadow-lg text-left">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order #{order.id.substring(0, 8)} Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Date:</span>
            <span>{format(new Date(order.created_at), 'PPP p')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-primary">${order.total_amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Payment Method:</span>
            <span>{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Payment Status:</span>
            <span>{order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}</span>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="space-y-2">
              {order.order_items?.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {item.cookies?.imageUrl && (
                      <img src={item.cookies.imageUrl} alt={item.cookies.name} className="w-10 h-10 object-cover rounded-md mr-2" />
                    )}
                    <span>{item.quantity} x {item.cookies?.name || 'Unknown Cookie'}</span>
                  </div>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          {renderPaymentInstructions()}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/my-account">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;