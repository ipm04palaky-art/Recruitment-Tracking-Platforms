'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center gap-2';

  const variantClasses = {
    primary: 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-primary hover:bg-primary/90 text-white shadow-lg',
    outline: 'border-2 border-accent text-accent hover:bg-accent/10',
    ghost: 'text-accent hover:bg-accent/10',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {icon}
      {children}
    </motion.button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-dark dark:text-light">{label}</label>}
      <input
        className={clsx(
          'px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-800 text-dark dark:text-light',
          'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-dark dark:text-light">{label}</label>}
      <select
        className={clsx(
          'px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-800 text-dark dark:text-light',
          'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
          'transition-all duration-200',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};