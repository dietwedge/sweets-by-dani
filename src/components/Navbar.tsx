import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
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
          {/* Removed the "Shop" link as requested */}
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cartItemCount})
            </Link>
          </Button>
          {isAdmin && ( // Only show Admin link if user is an admin
            <Button variant="ghost" asChild>
              <Link to="/admin">
                <User className="mr-2 h-4 w-4" /> Admin
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
                <User className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;