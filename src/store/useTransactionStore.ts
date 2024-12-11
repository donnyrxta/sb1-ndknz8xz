import { create } from 'zustand';
import type { Transaction } from '../types';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  getTransactionById: (id: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  getTransactionById: (id) => get().transactions.find((t) => t.id === id),
}));