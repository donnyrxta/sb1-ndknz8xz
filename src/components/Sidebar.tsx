import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Send, 
  History, 
  CreditCard, 
  HelpCircle,
  Users
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Send Money', to: '/send', icon: Send },
  { name: 'Transactions', to: '/transactions', icon: History },
  { name: 'My Accounts', to: '/accounts', icon: CreditCard },
  { name: 'Beneficiaries', to: '/beneficiaries', icon: Users },
  { name: 'Support', to: '/support', icon: HelpCircle },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}