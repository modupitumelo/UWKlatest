import { createClient } from '@supabase/supabase-js';
import { User, Profile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Profile functions
export const createProfile = async (profile: Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'phone_verified'>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();
  
  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

export const createTicketOrder = async (ticketType: string, quantity: number, userId: string) => {
  const { data, error } = await supabase
    .from('ticket_orders')
    .insert([{ 
      ticket_type: ticketType, 
      quantity, 
      user_id: userId,
      status: 'pending'
    }])
    .select();
  
  return { data, error };
};

export const updateTicketOrder = async (orderId: string, transactionId: string | null, status: 'completed' | 'cancelled') => {
  const { data, error } = await supabase
    .from('ticket_orders')
    .update({ 
      transaction_id: transactionId,
      status 
    })
    .eq('id', orderId)
    .select();
  
  return { data, error };
};

export const getUserTickets = async (userId: string) => {
  const { data, error } = await supabase
    .from('ticket_orders')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
};