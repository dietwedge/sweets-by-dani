import React, { useState, useEffect } from 'react';
import { useSession } from '@/context/SessionContext';
import { supabase } from '@/integrations/supabase/client';
import { Order, Profile } from '@/types/db'; // Assuming Profile type exists or will be created
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Package, DollarSign, Calendar, UserCircle2, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const MyAccount = () => {
  const { user, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionLoading && user) {
      fetchUserProfileAndOrders(user.id);
    } else if (!sessionLoading && !user) {
      setLoading(false);
      setError("You must be logged in to view your account.");
    }
  }, [user, sessionLoading]);

  const fetchUserProfileAndOrders = async (userId: string) => {
    setLoading(true);
    setError(null);

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      toast.error('Failed to load user profile.');
      setProfile(null);
    } else {
      setProfile(profileData as Profile);
    }

    // Fetch user orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*, order_items(*, cookies(name, imageUrl))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching user orders:', ordersError);
      toast.error('Failed to load your orders.');
      setOrders([]);
    } else {
      setOrders(ordersData as Order[]);
    }
    setLoading(false);
  };

  if (sessionLoading || loading) {
    return <div className="text-center py-10">Loading your account details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-8">My Account</h1>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center text-lg">
            <UserCircle2 className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Name: {profile?.full_name || 'N/A'}</span>
          </div>
          <div className="flex items-center text-lg">
            <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Email: {profile?.email || user?.email || 'N/A'}</span>
          </div>
          {/* Add more profile details here if needed */}
        </CardContent>
      </Card>

      <h2 className="text-3xl font-extrabold text-primary text-center mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Order #{order.id.substring(0, 8)}</CardTitle>
                <Badge
                  variant={
                    order.status === 'delivered' ? 'default' :
                    order.status === 'cancelled' ? 'destructive' :
                    'secondary'
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(order.created_at), 'PPP p')}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Total: ${order.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Payment Status: {order.payment_status}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAccount;