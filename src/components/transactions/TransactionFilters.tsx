import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import type { Provider } from '../../types';

interface TransactionFiltersProps {
  providers: Provider[];
  selectedProvider: Provider | 'all';
  dateRange: [Date | null, Date | null];
  onProviderChange: (provider: Provider | 'all') => void;
  onDateRangeChange: (range: [Date | null, Date | null]) => void;
}

export default function TransactionFilters({
  providers,
  selectedProvider,
  dateRange,
  onProviderChange,
  onDateRangeChange,
}: TransactionFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedProvider}
              onChange={(e) => onProviderChange(e.target.value as Provider | 'all')}
              className="appearance-none pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Providers</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateRange[0]?.toISOString().split('T')[0] || ''}
              onChange={(e) => onDateRangeChange([new Date(e.target.value), dateRange[1]])}
              className="text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange[1]?.toISOString().split('T')[0] || ''}
              onChange={(e) => onDateRangeChange([dateRange[0], new Date(e.target.value)])}
              className="text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => {
            onProviderChange('all');
            onDateRangeChange([null, null]);
          }}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}