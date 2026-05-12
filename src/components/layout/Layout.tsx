'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Mail,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';
import { useAuthStore, useUIStore } from '@store/auth';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const executiveMenu = [
  { label: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Hiring Trends', href: '/hiring-trends', icon: TrendingUp },
  { label: 'Diversity Dashboard', href: '/diversity', icon: BarChart3 },
  { label: 'Forecasting', href: '/forecasting', icon: TrendingUp },
];

const recruiterMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Candidates', href: '/candidates', icon: Users },
  { label: 'ATS Pipeline', href: '/pipeline', icon: Briefcase },
  { label: 'Requisitions', href: '/requisitions', icon: Briefcase },
  { label: 'Interviews', href: '/interviews', icon: Calendar },
  { label: 'Communications', href: '/communications', icon: Mail },
  { label: 'Analytics', href: '/recruiter-analytics', icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const menu = user?.role === 'board' || user?.role === 'leadership' ? executiveMenu : recruiterMenu;

  return (
    <motion.aside
      initial={{ x: -320 }}
      animate={{ x: isOpen ? 0 : -320 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-primary to-secondary shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Vanguard</h1>
          <button onClick={onClose} className="text-white lg:hidden">
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="bg-white/10 rounded-lg p-4 mb-8 backdrop-blur-sm">
            <p className="text-white font-semibold">{user.name}</p>
            <p className="text-white/75 text-sm capitalize">{user.role.replace('_', ' ')}</p>
          </div>
        )}

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-white text-primary font-semibold shadow-lg'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onMenuClick} className="text-dark dark:text-light lg:hidden">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-dark dark:text-light flex-1 text-center lg:text-left">
          Recruitment Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};