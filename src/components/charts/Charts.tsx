'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#4f46e5',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#6366f1',
  '#a855f7',
];

interface ChartProps {
  data: any[];
  title?: string;
  height?: number;
}

export const LineChartComponent: React.FC<ChartProps & { dataKey: string }> = ({
  data,
  title,
  height = 300,
  dataKey,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card">
      {title && <h3 className="text-lg font-bold text-dark dark:text-light mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ fill: '#4f46e5', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChartComponent: React.FC<ChartProps & { dataKey: string }> = ({
  data,
  title,
  height = 300,
  dataKey,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card">
      {title && <h3 className="text-lg font-bold text-dark dark:text-light mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Bar dataKey={dataKey} fill="#4f46e5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChartComponent: React.FC<ChartProps & { dataKey: string; nameKey: string }> = ({
  data,
  title,
  height = 300,
  dataKey,
  nameKey,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card">
      {title && <h3 className="text-lg font-bold text-dark dark:text-light mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};