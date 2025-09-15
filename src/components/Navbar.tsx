import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSession } from "@/context/SessionContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const { cartItemCount } = useCart();
  const { session, isAdmin } = useSession();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out.");
      console.error("Logout error:", error);
    } else {
      toast.info("You have been logged out.");
    }
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          🍪 Sweets by Dani
        </Link>
        <div className="flex space-x-4 items-center">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <span className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cartItemCount})
              </span>
            </Link>
          </Button>
          {session && (
            <Button variant="ghost" asChild>
              <Link to="/my-account"> {/* Changed to My Account */}
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> My Account
                </span>
              </Link>
            </Button>
          )}
          {isAdmin && (
            <Button variant="ghost" asChild>
              <Link to="/admin">
                <span className="flex items-center">
                  <Package className="mr-2 h-4 w-4" /> Admin
                </span>
              </Link>
            </Button>
          )}
          {session ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/login">
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Login
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;