import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isOutgoing = transaction.senderDetails.name === 'John Doe'; // In production, compare with actual user
  const Icon = isOutgoing ? ArrowUpRight : ArrowDownRight;
  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  }[transaction.status];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`${isOutgoing ? 'bg-red-100' : 'bg-green-100'} p-2 rounded-lg`}>
            <Icon className={`h-5 w-5 ${isOutgoing ? 'text-red-600' : 'text-green-600'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isOutgoing ? transaction.recipientDetails.name : transaction.senderDetails.name}
            </p>
            <p className="text-xs text-gray-500">
              Via {isOutgoing ? transaction.toProvider : transaction.fromProvider}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${isOutgoing ? 'text-red-600' : 'text-green-600'}`}>
            {isOutgoing ? '-' : '+'}{formatCurrency(transaction.amount)}
          </p>
          <p className="text-xs text-gray-500">{formatRelativeTime(transaction.timestamp)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-gray-500">Ref: {transaction.reference}</span>
        <span className={`px-2 py-1 rounded-full ${statusColor} capitalize`}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
}