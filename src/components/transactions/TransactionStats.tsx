import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface TransactionStatsProps {
  transactions: Transaction[];
}

export default function TransactionStats({ transactions }: TransactionStatsProps) {
  const stats = transactions.reduce(
    (acc, transaction) => {
      const isOutgoing = transaction.senderDetails.name === 'John Doe'; // In production, compare with actual user
      if (isOutgoing) {
        acc.totalSent += transaction.amount;
        acc.outgoingCount += 1;
      } else {
        acc.totalReceived += transaction.amount;
        acc.incomingCount += 1;
      }
      return acc;
    },
    { totalSent: 0, totalReceived: 0, outgoingCount: 0, incomingCount: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Sent</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalSent)}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{stats.outgoingCount} transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Received</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalReceived)}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingDown className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{stats.incomingCount} transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Net Flow</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatCurrency(stats.totalReceived - stats.totalSent)}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <Activity className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {stats.incomingCount + stats.outgoingCount} total transactions
        </p>
      </div>
    </div>
  );
}