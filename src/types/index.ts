export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  phone_verified: boolean;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: 'premium' | 'standard' | 'basic';
}

export interface TicketOrder {
  id: string;
  user_id: string;
  ticket_type: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  transaction_id?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email: string;
}