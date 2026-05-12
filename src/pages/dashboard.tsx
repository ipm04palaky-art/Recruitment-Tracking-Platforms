'use client';

import React, { useEffect, useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { KPICard, MetricBadge, StatChip } from '@components/cards/KPICard';
import {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
} from '@components/charts/Charts';
import { useCandidateStore, useRequisitionStore } from '@store/recruitment';
import { useAuthStore } from '@store/auth';
import {
  Users,
  TrendingUp,
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
} from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const mockChartData = [
  { month: 'Jan', hires: 8, openings: 12 },
  { month: 'Feb', hires: 12, openings: 10 },
  { month: 'Mar', hires: 15, openings: 14 },
  { month: 'Apr', hires: 10, openings: 16 },
  { month: 'May', hires: 18, openings: 12 },
  { month: 'Jun', hires: 20, openings: 10 },
];

const mockSourceData = [
  { name: 'LinkedIn', value: 35 },
  { name: 'Referral', value: 25 },
  { name: 'Naukri', value: 20 },
  { name: 'Campus', value: 15 },
  { name: 'Internal', value: 5 },
];

const mockDepartmentData = [
  { department: 'Engineering', hires: 15 },
  { department: 'Sales', hires: 8 },
  { department: 'Product', hires: 5 },
  { department: 'Design', hires: 4 },
  { department: 'Operations', hires: 3 },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { candidates, fetchCandidates } = useCandidateStore();
  const { requisitions, fetchRequisitions } = useRequisitionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const { initializeDummyData } = await import('@lib/dummy-data');
      await initializeDummyData();
      await fetchCandidates();
      await fetchRequisitions();
      setIsLoading(false);
    };
    initData();
  }, [fetchCandidates, fetchRequisitions]);

  const isExecutive = user?.role === 'board' || user?.role === 'leadership';

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  const totalCandidates = candidates.length;
  const appliedCount = candidates.filter((c) => c.stage === 'applied').length;
  const hiredCount = candidates.filter((c) => c.stage === 'joined').length;
  const openPositions = requisitions.filter((r) => r.status === 'approved').length;
  const offerAcceptanceRate = ((hiredCount / totalCandidates) * 100).toFixed(1);
  const avgTimeToHire = 35;

  return (
    <Layout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Page Title */}
        <motion.div variants={item}>
          <h1 className="text-4xl font-bold text-dark dark:text-light">
            {isExecutive ? 'Executive Dashboard' : 'Recruitment Dashboard'}
          </h1>
          <p className="text-muted mt-2">
            {isExecutive ? 'Strategic hiring intelligence for leadership' : 'Manage your recruitment pipeline'}
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <KPICard
            label="Total Applications"
            value={totalCandidates}
            trend={{ value: 12, isPositive: true }}
            icon={<Users size={24} />}
          />
          <KPICard
            label="Open Positions"
            value={openPositions}
            trend={{ value: 5, isPositive: false }}
            icon={<Briefcase size={24} />}
          />
          <KPICard
            label="Time to Hire (days)"
            value={avgTimeToHire}
            trend={{ value: 3, isPositive: false }}
            icon={<Clock size={24} />}
          />
          <KPICard
            label="Offer Acceptance Rate"
            value={`${offerAcceptanceRate}%`}
            trend={{ value: 8, isPositive: true }}
            icon={<CheckCircle size={24} />}
          />
        </motion.div>

        {/* Charts */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartComponent
            data={mockChartData}
            title="Hiring Trends"
            dataKey="hires"
            height={300}
          />
          <BarChartComponent
            data={mockDepartmentData}
            title="Department-wise Hiring"
            dataKey="hires"
            height={300}
          />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartComponent
            data={mockSourceData}
            title="Candidate Source"
            dataKey="value"
            nameKey="name"
            height={300}
          />
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card">
            <h3 className="text-lg font-bold text-dark dark:text-light mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <StatChip icon={<Users size={20} />} label="Total Candidates" value={totalCandidates} />
              <StatChip icon={<CheckCircle size={20} />} label="Hired this Month" value={hiredCount} />
              <StatChip icon={<TrendingUp size={20} />} label="Screening Rate" value="65%" />
              <StatChip icon={<DollarSign size={20} />} label="Avg. Offer" value="$120k" />
            </div>
          </div>
        </motion.div>

        {/* Pipeline Status */}
        <motion.div variants={item}>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card">
            <h3 className="text-lg font-bold text-dark dark:text-light mb-4">Pipeline Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted">Applied</span>
                <div className="flex items-center gap-2">
                  <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-sm font-medium">{appliedCount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Interview Scheduled</span>
                <div className="flex items-center gap-2">
                  <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }} />
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Offer Released</span>
                <div className="flex items-center gap-2">
                  <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Joined</span>
                <div className="flex items-center gap-2">
                  <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                  <span className="text-sm font-medium">{hiredCount}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}