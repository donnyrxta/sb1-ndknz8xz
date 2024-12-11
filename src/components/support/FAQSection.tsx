import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I link a new payment provider?',
    answer: 'To link a new provider, go to the Accounts page and click "Link New Account". Follow the verification process to securely connect your provider account.',
  },
  {
    question: 'What are the transaction limits?',
    answer: 'Transaction limits vary by provider. You can view your current limits in the Accounts section. Daily limits typically range from $500 to $2000, while monthly limits can go up to $20000.',
  },
  {
    question: 'How long do transfers take?',
    answer: 'Most transfers between providers are instant. However, during peak times or system maintenance, transfers might take up to 30 minutes.',
  },
  {
    question: 'What should I do if a transfer fails?',
    answer: 'If a transfer fails, check your transaction history for the error message. Most failures are due to insufficient funds or reaching daily limits. If the issue persists, create a support ticket.',
  },
  {
    question: 'How secure is my information?',
    answer: 'We use bank-grade encryption and security measures to protect your data. All transactions are monitored 24/7, and we employ multi-factor authentication for sensitive operations.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-4 py-3 text-left flex justify-between items-center"
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-4 pb-3">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}