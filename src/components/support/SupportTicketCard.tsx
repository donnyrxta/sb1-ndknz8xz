import React from 'react';
import { MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import type { SupportTicket } from '../../types';

interface SupportTicketCardProps {
  ticket: SupportTicket;
  onClick: (ticketId: string) => void;
}

export default function SupportTicketCard({ ticket, onClick }: SupportTicketCardProps) {
  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    inProgress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div
      onClick={() => onClick(ticket.id)}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-900">{ticket.subject}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
          {ticket.status.replace(/([A-Z])/g, ' $1').trim()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{ticket.messages.length}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatRelativeTime(ticket.updatedAt)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <AlertCircle className={`h-4 w-4 mr-1 ${priorityColors[ticket.priority]}`} />
          <span className={`text-xs font-medium ${priorityColors[ticket.priority]}`}>
            {ticket.priority} priority
          </span>
        </div>
      </div>
    </div>
  );
}