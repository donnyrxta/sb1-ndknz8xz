import { create } from 'zustand';
import type { SupportTicket, SupportMessage } from '../types';

interface SupportState {
  tickets: SupportTicket[];
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages'>) => void;
  addMessage: (ticketId: string, message: Omit<SupportMessage, 'id' | 'timestamp'>) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
}

export const useSupportStore = create<SupportState>((set) => ({
  tickets: [],
  createTicket: (ticket) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        {
          ...ticket,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
      ],
    })),
  addMessage: (ticketId, message) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              updatedAt: new Date(),
              messages: [
                ...ticket.messages,
                {
                  ...message,
                  id: crypto.randomUUID(),
                  ticketId,
                  timestamp: new Date(),
                },
              ],
            }
          : ticket
      ),
    })),
  updateTicketStatus: (ticketId, status) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status, updatedAt: new Date() }
          : ticket
      ),
    })),
}));