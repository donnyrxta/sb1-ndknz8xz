import { z } from 'zod';
import type { Provider } from '../types';

export const transferSchema = z.object({
  amount: z.number()
    .positive('Amount must be greater than 0')
    .max(10000, 'Amount cannot exceed $10,000'),
  fromProvider: z.string() as z.ZodType<Provider>,
  toProvider: z.string() as z.ZodType<Provider>,
  recipientAccount: z.string()
    .min(8, 'Account number must be at least 8 characters')
    .max(20, 'Account number cannot exceed 20 characters'),
  description: z.string().optional(),
});

export const kycSchema = z.object({
  nationalId: z.instanceof(File)
    .refine((file) => file.size <= 5000000, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'File must be JPEG, PNG, or PDF'
    ),
  proofOfResidence: z.instanceof(File)
    .refine((file) => file.size <= 5000000, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'File must be JPEG, PNG, or PDF'
    ),
});

export const beneficiarySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string()
    .regex(/^\+263[17][0-9]{8}$/, 'Invalid Zimbabwe phone number'),
  provider: z.string() as z.ZodType<Provider>,
  accountNumber: z.string()
    .min(8, 'Account number must be at least 8 characters'),
  nickname: z.string().optional(),
});

export const ticketSchema = z.object({
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject cannot exceed 100 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  priority: z.enum(['low', 'medium', 'high']),
});