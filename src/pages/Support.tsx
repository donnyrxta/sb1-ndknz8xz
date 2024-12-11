import React, { useState } from 'react';
import { Plus, Search, HelpCircle } from 'lucide-react';
import { useSupportStore } from '../store/useSupportStore';
import SupportTicketCard from '../components/support/SupportTicketCard';
import NewTicketModal from '../components/support/NewTicketModal';
import FAQSection from '../components/support/FAQSection';
import type { SupportTicket } from '../types';

export default function Support() {
  const { tickets, createTicket } = useSupportStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq'>('tickets');

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTicket = (data: Pick<SupportTicket, 'subject' | 'description' | 'priority'>) => {
    createTicket(data);
  };

  const handleTicketClick = (ticketId: string) => {
    // In production, this would navigate to a detailed ticket view
    console.log('Viewing ticket:', ticketId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Support Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Get help with your account and transactions
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Ticket
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'tickets'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'faq'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            FAQ
          </button>
        </div>
      </div>

      {activeTab === 'tickets' ? (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <SupportTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={handleTicketClick}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create a new ticket to get help from our support team
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <FAQSection />
      )}

      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}