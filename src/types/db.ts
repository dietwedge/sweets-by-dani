export type Cookie = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  ingredients: string[];
  allergens: string[];
  isAvailable: boolean;
  isFeatured: boolean;
};

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  cookie_id: string;
  quantity: number;
  price: number;
  created_at: string;
  cookies?: Cookie; // Joined cookie data
};

export type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'stripe' | 'cashapp' | 'venmo' | 'other';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
  profiles?: Profile; // Joined profile data
  order_items?: OrderItem[]; // Joined order items data
};