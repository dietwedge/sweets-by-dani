import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground mb-4">Your cart is currently empty.</p>
          <Button asChild>
            <Link to="/">Start Shopping</Link> {/* Changed to home page */}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4 mb-4 sm:mb-0" />
              <div className="flex-grow text-center sm:text-left">
                <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                <CardContent className="p-0 mt-2">
                  <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                </CardContent>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}

          <Card className="p-6 mt-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold">Cart Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-6">
              <div className="flex justify-between items-center text-xl font-semibold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-0 flex flex-col sm:flex-row justify-end gap-4">
              <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
                Clear Cart
              </Button>
              <Button className="w-full sm:w-auto" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;