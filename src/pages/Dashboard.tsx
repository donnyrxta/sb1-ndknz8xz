import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user?.providers.map((account) => (
          <div
            key={account.provider}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{account.provider}</p>
                <p className="mt-2 text-3xl font-bold">${account.balance.toFixed(2)}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <ArrowDownRight className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Received from John</p>
                <p className="text-sm text-gray-500">Via EcoCash</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">+$50.00</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Sent to Sarah</p>
                <p className="text-sm text-gray-500">Via Mukuru</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">-$30.00</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900">Quick Transfer</h2>
          <div className="mt-4 space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div className="flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                  alt="John"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">EcoCash</p>
                </div>
              </div>
              <Send className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900">Transfer Limits</h2>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-600">Daily Limit</p>
                <p className="text-sm font-medium text-gray-900">$500 / $1000</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}