'use client';

import React, { useEffect, useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { FilterPanel, FilterBadges } from '@components/layout/FilterPanel';
import { Button, Input, Select } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { useCandidateStore } from '@store/recruitment';
import { useNotificationStore } from '@store/auth';
import { CandidateSchema } from '@types/validation';
import { generateId, formatDate } from '@lib/utils';
import { Plus, Search, Filter, Eye, Edit, Trash2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Candidate } from '@types/index';

const statusColors = {
  screening_pending: 'bg-yellow-100 text-yellow-800',
  interview_scheduled: 'bg-blue-100 text-blue-800',
  awaiting_feedback: 'bg-purple-100 text-purple-800',
  offer_released: 'bg-green-100 text-green-800',
  joined: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

const stageColors = {
  applied: 'bg-gray-200',
  screening: 'bg-blue-200',
  assessment: 'bg-indigo-200',
  technical_interview: 'bg-purple-200',
  hr_interview: 'bg-pink-200',
  offer: 'bg-green-200',
  joined: 'bg-emerald-200',
  rejected: 'bg-red-200',
};

export default function CandidatesPage() {
  const {
    candidates,
    filteredCandidates,
    loading,
    selectedCandidate,
    filters,
    fetchCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    setSelectedCandidate,
    setFilters,
    resetFilters,
  } = useCandidateStore();

  const { addNotification } = useNotificationStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleApplied: '',
    source: 'linkedin' as const,
    skills: [] as string[],
    experience: 0,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleAddCandidate = async () => {
    try {
      const validatedData = CandidateSchema.parse(formData);
      const now = new Date();
      const newCandidate: Candidate = {
        id: generateId('cand'),
        ...validatedData,
        stage: 'applied',
        status: 'screening_pending',
        recruiter: 'Current User',
        notes: [],
        createdAt: now,
        updatedAt: now,
        appliedAt: now,
      };
      await addCandidate(newCandidate);
      setShowAddModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        roleApplied: '',
        source: 'linkedin',
        skills: [],
        experience: 0,
      });
      addNotification('Candidate added successfully', 'success');
    } catch (error: any) {
      if (error.errors) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      }
      addNotification('Failed to add candidate', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      await deleteCandidate(id);
      addNotification('Candidate deleted', 'success');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark dark:text-light">Candidates</h1>
            <p className="text-muted mt-1">Manage and track all candidates</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={() => setShowAddModal(true)}
          >
            Add Candidate
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-muted"
            />
            <Input
              placeholder="Search by name or email..."
              value={filters.search || ''}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            icon={<Filter size={20} />}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <FilterPanel onClose={() => setShowFilterPanel(false)} />
        )}

        {/* Active Filters */}
        <FilterBadges onClearAll={resetFilters} />

        {/* Results Count */}
        <div className="text-sm text-muted">
          Showing {filteredCandidates.length} of {candidates.length} candidates
        </div>

        {/* Candidates Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card overflow-hidden">
          {filteredCandidates.length === 0 ? (
            <div className="p-8 text-center text-muted">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No candidates found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Stage</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark dark:text-light">Applied</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-dark dark:text-light">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredCandidates.map((candidate) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-dark dark:text-light">{candidate.name}</td>
                      <td className="px-6 py-4 text-sm text-muted">{candidate.email}</td>
                      <td className="px-6 py-4 text-sm text-dark dark:text-light">{candidate.roleApplied}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            stageColors[candidate.stage as keyof typeof stageColors]
                          }`}
                        >
                          {candidate.stage.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[candidate.status as keyof typeof statusColors]
                          }`}
                        >
                          {candidate.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-dark dark:text-light capitalize">
                        {candidate.source}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">
                        {formatDate(candidate.appliedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="text-accent hover:text-accent/80 transition-colors"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => addNotification('Edit functionality coming soon', 'info')}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(candidate.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Candidate Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Candidate"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCandidate}>
              Add Candidate
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={formErrors.email}
          />
          <Input
            label="Phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={formErrors.phone}
          />
          <Input
            label="Role Applied"
            placeholder="Senior Software Engineer"
            value={formData.roleApplied}
            onChange={(e) => setFormData({ ...formData, roleApplied: e.target.value })}
            error={formErrors.roleApplied}
          />
          <Select
            label="Source"
            options={[
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'referral', label: 'Referral' },
              { value: 'naukri', label: 'Naukri' },
              { value: 'campus', label: 'Campus' },
              { value: 'internal', label: 'Internal' },
            ]}
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
          />
          <Input
            label="Experience (years)"
            type="number"
            min="0"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
          />
        </div>
      </Modal>

      {/* Candidate Details Drawer */}
      {selectedCandidate && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate.name}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Email</label>
              <p className="text-muted">{selectedCandidate.email}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Phone</label>
              <p className="text-muted">{selectedCandidate.phone}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Role Applied</label>
              <p className="text-muted">{selectedCandidate.roleApplied}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Skills</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCandidate.skills.map((skill) => (
                  <span key={skill} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Experience</label>
              <p className="text-muted">{selectedCandidate.experience} years</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Source</label>
              <p className="text-muted capitalize">{selectedCandidate.source}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-dark dark:text-light">Applied</label>
              <p className="text-muted">{formatDate(selectedCandidate.appliedAt)}</p>
            </div>
            <Button variant="primary" className="w-full" icon={<Mail size={20} />}>
              Send Email
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

import { Users } from 'lucide-react';