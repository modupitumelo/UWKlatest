/*
  # Create ticket orders table

  1. New Tables
    - `ticket_orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `ticket_type` (text)
      - `quantity` (integer)
      - `status` (text, enum: pending, completed, cancelled)
      - `created_at` (timestamptz)
      - `transaction_id` (text, nullable)

  2. Security
    - Enable RLS on `ticket_orders` table
    - Add policies for:
      - Users can read their own orders
      - Users can create their own orders
      - Admins can read all orders
*/

-- Create enum type for order status
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create ticket orders table
CREATE TABLE IF NOT EXISTS ticket_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  ticket_type text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  status text NOT NULL DEFAULT 'pending'::text CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  transaction_id text,
  CONSTRAINT ticket_type_check CHECK (ticket_type IN ('premium', 'standard', 'basic'))
);

-- Enable RLS
ALTER TABLE ticket_orders ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own orders
CREATE POLICY "Users can read own orders"
  ON ticket_orders
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create policy for users to create their own orders
CREATE POLICY "Users can create own orders"
  ON ticket_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ticket_orders_user_id ON ticket_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_ticket_orders_status ON ticket_orders(status);