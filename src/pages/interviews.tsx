'use client';

import React, { useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { Button, Input, Select } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { useInterviewStore } from '@store/recruitment';
import { useNotificationStore } from '@store/auth';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import { formatDatetime } from '@lib/utils';

export default function InterviewsPage() {
  const { interviews, fetchInterviews, addInterview, updateInterview } = useInterviewStore();
  const { addNotification } = useNotificationStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [formData, setFormData] = useState({
    candidateId: '',
    candidateName: '',
    role: '',
    interviewer: '',
    date: '',
    duration: 45,
    meetingLink: '',
  });

  React.useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const handleAddInterview = async () => {
    if (!formData.candidateId || !formData.interviewer || !formData.date) {
      addNotification('Please fill all required fields', 'error');
      return;
    }

    const now = new Date();
    const newInterview = {
      id: `int_${Date.now()}`,
      ...formData,
      date: new Date(formData.date),
      duration: parseInt(formData.duration.toString()),
      status: 'scheduled',
      createdAt: now,
      updatedAt: now,
    };

    await addInterview(newInterview);
    setShowAddModal(false);
    setFormData({
      candidateId: '',
      candidateName: '',
      role: '',
      interviewer: '',
      date: '',
      duration: 45,
      meetingLink: '',
    });
    addNotification('Interview scheduled successfully', 'success');
  };

  const statusBadges = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    pending_feedback: 'bg-yellow-100 text-yellow-800',
    rescheduled: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark dark:text-light">Interviews</h1>
            <p className="text-muted mt-1">Schedule and manage interviews</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={() => setShowAddModal(true)}
          >
            Schedule Interview
          </Button>
        </div>

        {/* Interviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>No interviews scheduled</p>
            </div>
          ) : (
            interviews.map((interview) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card border-l-4 border-accent"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark dark:text-light">
                      {interview.candidateName}
                    </h3>
                    <p className="text-sm text-muted">{interview.role}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusBadges[interview.status as keyof typeof statusBadges]
                    }`}
                  >
                    {interview.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Calendar size={16} />
                    {formatDatetime(interview.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock size={16} />
                    {interview.duration} minutes
                  </div>
                  {interview.meetingLink && (
                    <div className="flex items-center gap-2">
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent text-sm hover:underline"
                      >
                        Join Meeting
                      </a>
                    </div>
                  )}
                  <div className="text-sm text-muted">Interviewer: {interview.interviewer}</div>
                </div>

                {interview.feedback && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-dark dark:text-light mb-2">Feedback</p>
                    <p className="text-sm text-muted">{interview.feedback.comments}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {Object.entries(interview.feedback)
                        .filter(([key]) => key !== 'comments')
                        .map(([key, value]) => (
                          <span key={key} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                            {key}: {value}/5
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit size={16} />}
                    onClick={() => setSelectedInterview(interview)}
                  />
                  <Button variant="ghost" size="sm" icon={<Trash2 size={16} />} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Schedule Interview"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddInterview}>
              Schedule
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Candidate Name"
            placeholder="Select candidate..."
            value={formData.candidateName}
            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
          />
          <Input
            label="Role"
            placeholder="Senior Engineer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Input
            label="Interviewer"
            placeholder="Interviewer name"
            value={formData.interviewer}
            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
          />
          <Input
            label="Date & Time"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            label="Duration (minutes)"
            type="number"
            min="15"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 45 })}
          />
          <Input
            label="Meeting Link"
            placeholder="https://meet.google.com/..."
            value={formData.meetingLink}
            onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
          />
        </div>
      </Modal>
    </Layout>
  );
}