export type Provider = 'Mukuru' | 'EcoCash' | 'InnBucks' | 'OneWallet' | 'OMari';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  providers: ProviderAccount[];
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments: KYCDocument[];
}

export interface KYCDocument {
  id: string;
  type: 'nationalId' | 'passport' | 'proofOfResidence';
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: Date;
  verifiedAt?: Date;
}

export interface ProviderAccount {
  provider: Provider;
  accountNumber: string;
  balance: number;
  limits: {
    daily: number;
    monthly: number;
    remaining: {
      daily: number;
      monthly: number;
    };
  };
}

export interface Transaction {
  id: string;
  fromProvider: Provider;
  toProvider: Provider;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  reference: string;
  senderDetails: {
    name: string;
    accountNumber: string;
  };
  recipientDetails: {
    name: string;
    accountNumber: string;
  };
}

export interface Beneficiary {
  id: string;
  name: string;
  phoneNumber: string;
  provider: Provider;
  accountNumber: string;
  nickname?: string;
  lastTransferDate?: Date;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'inProgress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  messages: SupportMessage[];
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
  attachments?: string[];
}