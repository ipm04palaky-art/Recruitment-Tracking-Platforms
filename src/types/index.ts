export enum UserRole {
  BOARD = 'board',
  LEADERSHIP = 'leadership',
  TALENT_MANAGER = 'talent_manager',
  RECRUITER = 'recruiter',
  HIRING_MANAGER = 'hiring_manager',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  createdAt: Date;
}

export enum CandidateStage {
  APPLIED = 'applied',
  SCREENING = 'screening',
  ASSESSMENT = 'assessment',
  TECHNICAL_INTERVIEW = 'technical_interview',
  HR_INTERVIEW = 'hr_interview',
  OFFER = 'offer',
  JOINED = 'joined',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
}

export enum CandidateStatus {
  SCREENING_PENDING = 'screening_pending',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  AWAITING_FEEDBACK = 'awaiting_feedback',
  OFFER_RELEASED = 'offer_released',
  JOINED = 'joined',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
}

export enum CandidateSource {
  LINKEDIN = 'linkedin',
  REFERRAL = 'referral',
  NAUKRI = 'naukri',
  CAMPUS = 'campus',
  INTERNAL = 'internal',
  OTHERS = 'others',
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleApplied: string;
  source: CandidateSource;
  recruiter: string;
  stage: CandidateStage;
  status: CandidateStatus;
  resume?: string;
  linkedin?: string;
  skills: string[];
  experience: number;
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
  appliedAt: Date;
  screenedAt?: Date;
  interviewedAt?: Date;
  offerReleasedAt?: Date;
  joinedAt?: Date;
  rejectedAt?: Date;
}

export enum RequisitionStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  ON_HOLD = 'on_hold',
  CLOSED = 'closed',
}

export enum Priority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Requisition {
  id: string;
  jobTitle: string;
  department: string;
  hiringManager: string;
  openings: number;
  budget: number;
  priority: Priority;
  deadline: Date;
  location: string;
  jdUrl?: string;
  status: RequisitionStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvalDate?: Date;
}

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  PENDING_FEEDBACK = 'pending_feedback',
  RESCHEDULED = 'rescheduled',
  CANCELLED = 'cancelled',
}

export interface InterviewFeedback {
  technicalSkills: number;
  communication: number;
  problemSolving: number;
  cultureFit: number;
  overallRating: number;
  comments: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  interviewer: string;
  date: Date;
  duration: number;
  meetingLink?: string;
  feedback?: InterviewFeedback;
  status: InterviewStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum OfferStatus {
  DRAFT = 'draft',
  RELEASED = 'released',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  salary: number;
  currency: string;
  joiningDate: Date;
  benefits: string[];
  expiryDate: Date;
  status: OfferStatus;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
}

export interface DiversityMetrics {
  genderDiversity: {
    male: number;
    female: number;
    other: number;
  };
  departmentDiversity: Record<string, number>;
  sourceMetrics: Record<CandidateSource, number>;
}

export interface HiringMetrics {
  totalOpenPositions: number;
  hiringVelocity: number;
  timeToHire: number;
  offerAcceptanceRate: number;
  hiringCost: number;
  recruiterProductivity: number;
  totalApplications: number;
  totalHired: number;
}