'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: number;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'px-4 py-3 font-medium whitespace-nowrap flex items-center gap-2 transition-all duration-200',
            activeTab === tab.id
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted hover:text-dark dark:hover:text-light'
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.badge && (
            <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <button
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="font-medium text-dark dark:text-light">{item.title}</span>
            <motion.div
              animate={{ rotate: expandedId === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} className="text-muted" />
            </motion.div>
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: expandedId === item.id ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 dark:border-slate-700"
          >
            <div className="px-6 py-4">{item.content}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};