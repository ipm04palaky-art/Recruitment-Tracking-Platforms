'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  trend,
  icon,
  onClick,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={clsx(
        'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900',
        'rounded-lg p-6 shadow-card hover:shadow-glass cursor-pointer',
        'border border-slate-200 dark:border-slate-700',
        'transition-all duration-300',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted mb-2">{label}</p>
          <p className="text-3xl font-bold text-dark dark:text-light">{value}</p>
          {trend && (
            <p
              className={clsx(
                'text-sm font-medium mt-2',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        {icon && (
          <div className="text-accent opacity-75">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface MetricBadgeProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const MetricBadge: React.FC<MetricBadgeProps> = ({
  label,
  value,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span className={clsx('px-3 py-1 rounded-full text-sm font-medium', variantClasses[variant])}>
      {label}: {value}
    </span>
  );
};

interface StatChipProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export const StatChip: React.FC<StatChipProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 bg-glass dark:bg-glass-dark rounded-lg p-3 backdrop-blur-md border border-slate-200 dark:border-slate-700">
      <div className="text-accent text-lg">{icon}</div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-lg font-semibold text-dark dark:text-light">{value}</p>
      </div>
    </div>
  );
};