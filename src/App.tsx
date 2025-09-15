import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "./context/SessionContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> {/* Set dark as default theme */}
      <SessionProvider>
        <CartProvider>
          <Router>
            <Toaster richColors position="top-right" />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;