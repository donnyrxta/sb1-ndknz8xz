import { create } from 'zustand';
import type { Beneficiary } from '../types';

interface BeneficiaryState {
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Beneficiary) => void;
  updateBeneficiary: (id: string, updates: Partial<Beneficiary>) => void;
  removeBeneficiary: (id: string) => void;
}

export const useBeneficiaryStore = create<BeneficiaryState>((set) => ({
  beneficiaries: [],
  addBeneficiary: (beneficiary) =>
    set((state) => ({
      beneficiaries: [...state.beneficiaries, beneficiary],
    })),
  updateBeneficiary: (id, updates) =>
    set((state) => ({
      beneficiaries: state.beneficiaries.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
  removeBeneficiary: (id) =>
    set((state) => ({
      beneficiaries: state.beneficiaries.filter((b) => b.id !== id),
    })),
}));