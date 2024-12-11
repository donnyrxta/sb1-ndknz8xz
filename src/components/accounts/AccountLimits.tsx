import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import type { ProviderAccount } from '../../types';

interface AccountLimitsProps {
  account: ProviderAccount;
}

export default function AccountLimits({ account }: AccountLimitsProps) {
  const dailyUsagePercentage = ((account.limits.daily - account.limits.remaining.daily) / account.limits.daily) * 100;
  const monthlyUsagePercentage = ((account.limits.monthly - account.limits.remaining.monthly) / account.limits.monthly) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Transfer Limits</h3>
        <Info className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Daily Limit Usage</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(account.limits.daily - account.limits.remaining.daily)} / {formatCurrency(account.limits.daily)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                dailyUsagePercentage > 80 ? 'bg-red-600' : 'bg-indigo-600'
              }`}
              style={{ width: `${dailyUsagePercentage}%` }}
            />
          </div>
          {dailyUsagePercentage > 80 && (
            <div className="flex items-center mt-1">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">Approaching daily limit</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Monthly Limit Usage</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(account.limits.monthly - account.limits.remaining.monthly)} / {formatCurrency(account.limits.monthly)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                monthlyUsagePercentage > 80 ? 'bg-red-600' : 'bg-indigo-600'
              }`}
              style={{ width: `${monthlyUsagePercentage}%` }}
            />
          </div>
          {monthlyUsagePercentage > 80 && (
            <div className="flex items-center mt-1">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">Approaching monthly limit</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}