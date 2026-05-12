import { z } from 'zod';

export const CandidateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  roleApplied: z.string().min(1, 'Role is required'),
  source: z.enum(['linkedin', 'referral', 'naukri', 'campus', 'internal', 'others']),
  skills: z.array(z.string()),
  experience: z.number().min(0),
  resume: z.string().optional(),
  linkedin: z.string().url().optional(),
});

export const RequisitionSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  hiringManager: z.string().min(1, 'Hiring manager is required'),
  openings: z.number().min(1, 'Openings must be at least 1'),
  budget: z.number().min(0, 'Budget must be positive'),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  deadline: z.date(),
  location: z.string().min(1, 'Location is required'),
  jdUrl: z.string().url().optional(),
});

export const InterviewSchema = z.object({
  candidateId: z.string().min(1),
  interviewer: z.string().min(1, 'Interviewer is required'),
  date: z.date(),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  meetingLink: z.string().url().optional(),
});

export const InterviewFeedbackSchema = z.object({
  technicalSkills: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  problemSolving: z.number().min(1).max(5),
  cultureFit: z.number().min(1).max(5),
  overallRating: z.number().min(1).max(5),
  comments: z.string().optional(),
});

export type CandidateInput = z.infer<typeof CandidateSchema>;
export type RequisitionInput = z.infer<typeof RequisitionSchema>;
export type InterviewInput = z.infer<typeof InterviewSchema>;
export type InterviewFeedbackInput = z.infer<typeof InterviewFeedbackSchema>;