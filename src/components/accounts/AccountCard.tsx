import React from 'react';
import { Shield, AlertCircle, ExternalLink } from 'lucide-react';
import { formatCurrency, formatPhoneNumber } from '../../utils/formatters';
import type { ProviderAccount } from '../../types';

interface AccountCardProps {
  account: ProviderAccount;
  onLinkAccount: () => void;
}

export default function AccountCard({ account, onLinkAccount }: AccountCardProps) {
  const remainingDailyPercentage = (account.limits.remaining.daily / account.limits.daily) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{account.provider}</h3>
          <p className="text-sm text-gray-500">{formatPhoneNumber(account.accountNumber)}</p>
        </div>
        <div className="bg-green-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-green-800">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Available Balance</span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(account.balance)}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Daily Limit Remaining</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(account.limits.remaining.daily)} / {formatCurrency(account.limits.daily)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${remainingDailyPercentage}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onLinkAccount}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Manage Account
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-500">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}