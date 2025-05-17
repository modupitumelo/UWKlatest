import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserTickets } from '../services/supabase';
import { TicketOrder } from '../types';
import { Ticket, Award, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [tickets, setTickets] = useState<TicketOrder[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getUserTickets(user.id);
        if (error) throw error;
        setTickets(data || []);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      } finally {
        setTicketsLoading(false);
      }
    };
    
    if (user) {
      fetchTickets();
    }
  }, [user]);
  
  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const ticketTypeToLabel = (type: string) => {
    switch (type) {
      case 'premium':
        return 'R1.1 Million Dream Home';
      case 'standard':
        return 'R600,000 Home Build';
      case 'basic':
        return 'R350,000 Building Materials';
      default:
        return type;
    }
  };
  
  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-semibold mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Ticket className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">My Tickets</h2>
            </div>
            <p className="text-3xl font-bold text-primary-600">
              {ticketsLoading ? '...' : tickets.reduce((total, ticket) => total + ticket.quantity, 0)}
            </p>
            <p className="text-neutral-600">Total tickets purchased</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Award className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">Next Draw</h2>
            </div>
            <p className="text-neutral-600">
              The next prize draw will be announced soon. Stay tuned for updates!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">Account Details</h2>
            </div>
            <p className="text-neutral-600">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-neutral-600">
              <strong>Joined:</strong> {new Date(user?.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold">Your Ticket History</h2>
          </div>
          
          {ticketsLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-neutral-600">Loading your tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mb-4">
                <Ticket className="w-12 h-12 text-neutral-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Tickets Yet</h3>
              <p className="text-neutral-600 mb-6">
                You haven't purchased any tickets yet. Start your journey towards winning your dream home today!
              </p>
              <Link 
                to="/prizes" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Browse Prizes
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-medium text-neutral-700">Date</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-neutral-700">Ticket Type</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-neutral-700">Quantity</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-neutral-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-neutral-50">
                      <td className="py-4 px-6 text-sm text-neutral-700">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-700">
                        {ticketTypeToLabel(ticket.ticket_type)}
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-700">
                        {ticket.quantity}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : ticket.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="p-6 bg-neutral-50 border-t border-neutral-200">
            <p className="text-neutral-600 text-sm">
              For any questions about your tickets, please <Link to="/contact" className="text-primary-600 hover:underline">contact our support team</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;