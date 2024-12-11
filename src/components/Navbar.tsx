import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Bell, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ZimPay</span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <img
                  className="h-8 w-8 rounded-full ml-2"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                  alt={user.name}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}