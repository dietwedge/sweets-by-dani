import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import CookieDetail from "./pages/CookieDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import { SessionProvider, useSession } from "./context/SessionContext";
import { Toaster } from "@/components/ui/sonner"; // Assuming sonner is installed for toasts

// A simple wrapper to protect routes
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { session, loading, isAdmin } = useSession();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />; // Redirect non-admins from admin routes
  }

  return children;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <SessionProvider>
          <Toaster /> {/* Toaster for displaying notifications */}
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cookie/:id" element={<CookieDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </SessionProvider>
      </CartProvider>
    </Router>
  );
}

export default App;