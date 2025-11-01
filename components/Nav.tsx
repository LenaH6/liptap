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
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-gray-800/50 px-4 py-3 h-20 flex items-center justify-around gap-2 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/50'
                : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
            aria-label={item.label}
          >
            <Icon size={20} strokeWidth={2} />
          </button>
        );
      })}
    </nav>
  );
}
