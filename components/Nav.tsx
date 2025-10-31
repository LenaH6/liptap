'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Wallet, Target, Trophy } from 'lucide-react';
import LipsIcon from './LipsIcon';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: '/tap', icon: LipsIcon, label: 'Tap' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/missions', icon: Target, label: 'Missions' },
    { path: '/ranking', icon: Trophy, label: 'Ranking' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-800 flex justify-around items-center h-24 gap-2 px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isActive
                ? 'bg-primary/40 text-primary shadow-lg shadow-primary/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
            }`}
            aria-label={item.label}
          >
            <Icon size={24} strokeWidth={2} />
          </button>
        );
      })}
    </nav>
  );
}
