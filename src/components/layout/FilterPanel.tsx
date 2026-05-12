'use client';

import React, { useState } from 'react';
import { useCandidateStore } from '@store/recruitment';
import { Input, Select, Button } from '@components/common/Button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const stages = [
  { value: '', label: 'All Stages' },
  { value: 'applied', label: 'Applied' },
  { value: 'screening', label: 'Screening' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'technical_interview', label: 'Technical Interview' },
  { value: 'hr_interview', label: 'HR Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'joined', label: 'Joined' },
  { value: 'rejected', label: 'Rejected' },
];

const sources = [
  { value: '', label: 'All Sources' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral' },
  { value: 'naukri', label: 'Naukri' },
  { value: 'campus', label: 'Campus' },
  { value: 'internal', label: 'Internal' },
];

interface FilterPanelProps {
  onClose?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
  const { filters, setFilters, resetFilters } = useCandidateStore();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onClose?.();
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-dark dark:text-light">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="text-muted hover:text-dark">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <Input
          label="Search Candidate"
          placeholder="Name or email..."
          value={localFilters.search || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
        />

        <Select
          label="Stage"
          options={stages}
          value={localFilters.stage || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, stage: e.target.value })}
        />

        <Select
          label="Source"
          options={sources}
          value={localFilters.source || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, source: e.target.value })}
        />

        <Input
          label="Role"
          placeholder="Job title..."
          value={localFilters.role || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, role: e.target.value })}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="primary" onClick={handleApply} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1">
          Reset
        </Button>
      </div>
    </motion.div>
  );
};

interface FilterBadgesProps {
  onClearAll?: () => void;
}

export const FilterBadges: React.FC<FilterBadgesProps> = ({ onClearAll }) => {
  const { filters, setFilters } = useCandidateStore();
  const activeFilters = Object.entries(filters).filter(([, v]) => v);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {activeFilters.map(([key, value]) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
        >
          {value}
          <button
            onClick={() => setFilters({ ...filters, [key]: undefined })}
            className="hover:text-accent/80"
          >
            <X size={14} />
          </button>
        </motion.div>
      ))}
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-accent text-sm font-medium hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
};