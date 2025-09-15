import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/db';
import AdminOrderTable from '@/components/admin/AdminOrderTable';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name, email), order_items(*, cookies(name))')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders.');
      toast.error('Failed to load orders.');
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status.');
    } else {
      toast.success(`Order ${orderId.substring(0, 8)}... status updated to ${status}.`);
      fetchOrders(); // Re-fetch orders to update the table
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: Order['payment_status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status.');
    } else {
      toast.success(`Order ${orderId.substring(0, 8)}... payment status updated to ${paymentStatus}.`);
      fetchOrders(); // Re-fetch orders to update the table
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary mb-6">Order Management</h1>
      <AdminOrderTable
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
      />
    </div>
  );
};

export default AdminOrders;