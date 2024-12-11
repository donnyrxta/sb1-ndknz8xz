import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, ArrowRight, Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBeneficiaryStore } from '../store/useBeneficiaryStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { transferSchema } from '../utils/validation';
import { formatCurrency, formatPhoneNumber } from '../utils/formatters';
import type { Provider } from '../types';

type TransferForm = {
  amount: number;
  fromProvider: Provider;
  toProvider: Provider;
  recipientAccount: string;
  description?: string;
};

export default function SendMoney() {
  const { user } = useAuthStore();
  const { beneficiaries } = useBeneficiaryStore();
  const { addTransaction } = useTransactionStore();
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromProvider: user?.providers[0]?.provider,
    },
  });

  const watchAmount = watch('amount');
  const watchFromProvider = watch('fromProvider');
  const selectedProvider = user?.providers.find(p => p.provider === watchFromProvider);

  const handleBeneficiarySelect = (beneficiaryId: string) => {
    const beneficiary = beneficiaries.find(b => b.id === beneficiaryId);
    if (beneficiary) {
      setSelectedBeneficiary(beneficiaryId);
      setValue('toProvider', beneficiary.provider);
      setValue('recipientAccount', beneficiary.accountNumber);
    }
  };

  const onSubmit = (data: TransferForm) => {
    if (step === 'details') {
      setStep('confirm');
      return;
    }

    // Process the transaction
    const transaction = {
      id: crypto.randomUUID(),
      fromProvider: data.fromProvider,
      toProvider: data.toProvider,
      amount: data.amount,
      status: 'pending' as const,
      timestamp: new Date(),
      reference: `TRX${Date.now()}`,
      senderDetails: {
        name: user!.name,
        accountNumber: selectedProvider!.accountNumber,
      },
      recipientDetails: {
        name: selectedBeneficiary 
          ? beneficiaries.find(b => b.id === selectedBeneficiary)?.name || 'Unknown'
          : 'Unknown',
        accountNumber: data.recipientAccount,
      },
    };

    addTransaction(transaction);
    // In production, this would make an API call to process the transaction
    setTimeout(() => {
      window.location.href = '/transactions';
    }, 1500);
  };

  if (!user || !selectedProvider) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Send Money</h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => setStep('details')}
          >
            <Users className="h-5 w-5 mr-2" />
            Select Beneficiary
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Account</label>
              <select
                {...register('fromProvider')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                {user.providers.map((provider) => (
                  <option key={provider.provider} value={provider.provider}>
                    {provider.provider} - {formatCurrency(provider.balance)}
                  </option>
                ))}
              </select>
              {errors.fromProvider && (
                <p className="mt-1 text-sm text-red-600">{errors.fromProvider.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To Provider</label>
              <select
                {...register('toProvider')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="">Select Provider</option>
                <option value="EcoCash">EcoCash</option>
                <option value="Mukuru">Mukuru</option>
                <option value="InnBucks">InnBucks</option>
                <option value="OneWallet">OneWallet</option>
                <option value="OMari">O'Mari</option>
              </select>
              {errors.toProvider && (
                <p className="mt-1 text-sm text-red-600">{errors.toProvider.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient Account</label>
              <input
                type="text"
                {...register('recipientAccount')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter account number"
              />
              {errors.recipientAccount && (
                <p className="mt-1 text-sm text-red-600">{errors.recipientAccount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <input
                type="text"
                {...register('description')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What's this for?"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Transfer Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">From</span>
                  <span className="text-gray-900">{watchFromProvider}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(watchAmount)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Fee</span>
                  <span className="text-gray-900">$0.50</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(watchAmount + 0.50)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Money
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}