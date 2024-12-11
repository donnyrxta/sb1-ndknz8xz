import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import AccountCard from '../components/accounts/AccountCard';
import AccountLimits from '../components/accounts/AccountLimits';
import LinkAccountModal from '../components/accounts/LinkAccountModal';
import type { Provider } from '../types';

export default function Accounts() {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkAccount = (provider: Provider, phoneNumber: string) => {
    // In production, this would make an API call to link the account
    console.log('Linking account:', { provider, phoneNumber });
  };

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Accounts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your connected payment providers and account settings
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Link New Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.providers.map((account) => (
          <AccountCard
            key={account.provider}
            account={account}
            onLinkAccount={() => console.log('Managing account:', account.provider)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.providers.map((account) => (
            <AccountLimits key={account.provider} account={account} />
          ))}
        </div>
      </div>

      <LinkAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleLinkAccount}
      />
    </div>
  );
}