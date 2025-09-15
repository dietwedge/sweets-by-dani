import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Order } from '@/types/db';
import { format } from 'date-fns';

interface AdminOrderTableProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdatePaymentStatus: (orderId: string, paymentStatus: Order['payment_status']) => void;
}

const AdminOrderTable: React.FC<AdminOrderTableProps> = ({
  orders,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
}) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'success'; // Assuming a 'success' variant exists or can be styled
      case 'pending':
      case 'processing':
        return 'warning'; // Assuming a 'warning' variant exists or can be styled
      case 'cancelled':
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                <TableCell>{order.profiles?.full_name || order.profiles?.email || 'N/A'}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.payment_status)}>{order.payment_status}</Badge>
                </TableCell>
                <TableCell>{format(new Date(order.created_at), 'PPP')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log('View order details:', order.id)}>
                        View Order Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger>Update Order Status</DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <DropdownMenuItem key={status} onClick={() => onUpdateOrderStatus(order.id, status as Order['status'])}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger>Update Payment Status</DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {['pending', 'completed', 'failed', 'refunded'].map((paymentStatus) => (
                              <DropdownMenuItem key={paymentStatus} onClick={() => onUpdatePaymentStatus(order.id, paymentStatus as Order['payment_status'])}>
                                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrderTable;