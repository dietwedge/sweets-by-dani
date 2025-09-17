import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import the new Footer component

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground"> {/* Apply fixed dark theme background and text colors */}
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer /> {/* Use the new Footer component */}
    </div>
  );
};

export default Layout;