import React, { useState, useMemo } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import TransactionCard from '../components/transactions/TransactionCard';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionStats from '../components/transactions/TransactionStats';
import type { Provider } from '../types';

export default function Transactions() {
  const { transactions } = useTransactionStore();
  const [selectedProvider, setSelectedProvider] = useState<Provider | 'all'>('all');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesProvider =
        selectedProvider === 'all' ||
        transaction.fromProvider === selectedProvider ||
        transaction.toProvider === selectedProvider;

      const matchesDateRange =
        (!dateRange[0] || transaction.timestamp >= dateRange[0]) &&
        (!dateRange[1] || transaction.timestamp <= dateRange[1]);

      return matchesProvider && matchesDateRange;
    });
  }, [transactions, selectedProvider, dateRange]);

  const providers: Provider[] = [
    'EcoCash',
    'Mukuru',
    'InnBucks',
    'OneWallet',
    'OMari',
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your transaction history across all providers
        </p>
      </div>

      <TransactionStats transactions={filteredTransactions} />

      <TransactionFilters
        providers={providers}
        selectedProvider={selectedProvider}
        dateRange={dateRange}
        onProviderChange={setSelectedProvider}
        onDateRangeChange={setDateRange}
      />

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}