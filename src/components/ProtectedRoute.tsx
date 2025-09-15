import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@/context/SessionContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { session, user, isAdmin, loading } = useSession();

  if (loading) {
    // Optionally render a loading spinner or placeholder
    return <div className="text-center py-10">Loading authentication...</div>;
  }

  if (!session || !user) {
    toast.error("You need to be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    toast.error("You do not have administrative access to view this page.");
    return <Navigate to="/" replace />; // Redirect non-admins to home
  }

  return <>{children}</>;
};

export default ProtectedRoute;