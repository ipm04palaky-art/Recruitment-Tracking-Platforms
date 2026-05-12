import type { Candidate, Requisition, Interview, Offer, User } from '@types/index';
import { generateId } from '@lib/utils';

const recruiters = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown'];
const roles = [
  'Senior Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'DevOps Engineer',
  'Full Stack Developer',
  'Sales Manager',
];
const candidates = [
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210' },
  { name: 'Bob Smith', email: 'bob@example.com', phone: '9876543211' },
  { name: 'Carol White', email: 'carol@example.com', phone: '9876543212' },
  { name: 'David Brown', email: 'david@example.com', phone: '9876543213' },
  { name: 'Eve Davis', email: 'eve@example.com', phone: '9876543214' },
  { name: 'Frank Miller', email: 'frank@example.com', phone: '9876543215' },
  { name: 'Grace Lee', email: 'grace@example.com', phone: '9876543216' },
  { name: 'Henry Wilson', email: 'henry@example.com', phone: '9876543217' },
  { name: 'Iris Taylor', email: 'iris@example.com', phone: '9876543218' },
  { name: 'Jack Anderson', email: 'jack@example.com', phone: '9876543219' },
];

const stages = [
  'applied',
  'screening',
  'assessment',
  'technical_interview',
  'hr_interview',
  'offer',
  'joined',
  'rejected',
];

const sources = ['linkedin', 'referral', 'naukri', 'campus', 'internal'];
const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git'];
const departments = ['Engineering', 'Sales', 'Product', 'Design', 'Operations'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateDummyCandidates(count: number = 50): Candidate[] {
  const result: Candidate[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const candidate = candidates[i % candidates.length];
    const appliedAt = randomDate(threeMonthsAgo, now);

    result.push({
      id: generateId('cand'),
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      roleApplied: randomElement(roles),
      source: randomElement(sources) as any,
      recruiter: randomElement(recruiters),
      stage: randomElement(stages) as any,
      status: randomElement([
        'screening_pending',
        'interview_scheduled',
        'awaiting_feedback',
        'offer_released',
        'joined',
        'rejected',
      ]) as any,
      resume: `resume_${i}.pdf`,
      skills: skills.slice(0, Math.floor(Math.random() * 5) + 2),
      experience: Math.floor(Math.random() * 10) + 1,
      notes: ['Good fit for role', 'Strong technical skills'],
      createdAt: appliedAt,
      updatedAt: now,
      appliedAt,
    });
  }

  return result;
}

export function generateDummyRequisitions(count: number = 20): Requisition[] {
  const result: Requisition[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const createdAt = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const deadline = new Date(createdAt.getTime() + 60 * 24 * 60 * 60 * 1000);

    result.push({
      id: generateId('req'),
      jobTitle: randomElement(roles),
      department: randomElement(departments),
      hiringManager: randomElement(recruiters),
      openings: Math.floor(Math.random() * 3) + 1,
      budget: 50000 + Math.random() * 200000,
      priority: randomElement(['critical', 'high', 'medium', 'low']) as any,
      deadline,
      location: randomElement(['New York', 'San Francisco', 'Chicago', 'Austin', 'Remote']),
      status: randomElement(['draft', 'pending_approval', 'approved', 'on_hold', 'closed']) as any,
      createdAt,
      updatedAt: now,
    });
  }

  return result;
}

export function generateDummyInterviews(candidateCount: number = 20): Interview[] {
  const result: Interview[] = [];
  const now = new Date();
  const interviewers = ['Mike Johnson', 'Sarah Wilson', 'Tom Brown'];

  for (let i = 0; i < candidateCount; i++) {
    const date = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);

    result.push({
      id: generateId('int'),
      candidateId: generateId('cand'),
      candidateName: candidates[i % candidates.length].name,
      role: randomElement(roles),
      interviewer: randomElement(interviewers),
      date,
      duration: 45 + Math.random() * 30,
      meetingLink: `https://meet.google.com/abc-defg-hij-${i}`,
      status: randomElement([
        'scheduled',
        'completed',
        'pending_feedback',
        'rescheduled',
      ]) as any,
      createdAt: new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: now,
      feedback:
        Math.random() > 0.5
          ? {
              technicalSkills: Math.floor(Math.random() * 5) + 1,
              communication: Math.floor(Math.random() * 5) + 1,
              problemSolving: Math.floor(Math.random() * 5) + 1,
              cultureFit: Math.floor(Math.random() * 5) + 1,
              overallRating: Math.floor(Math.random() * 5) + 1,
              comments: 'Good candidate, strong technical background',
            }
          : undefined,
    });
  }

  return result;
}

export function generateDummyOffers(count: number = 10): Offer[] {
  const result: Offer[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const createdAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);

    result.push({
      id: generateId('off'),
      candidateId: generateId('cand'),
      candidateName: candidates[i % candidates.length].name,
      role: randomElement(roles),
      salary: 60000 + Math.random() * 150000,
      currency: 'USD',
      joiningDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
      expiryDate: new Date(createdAt.getTime() + 14 * 24 * 60 * 60 * 1000),
      status: randomElement(['draft', 'released', 'accepted', 'rejected', 'expired']) as any,
      createdAt,
      updatedAt: now,
      acceptedAt: Math.random() > 0.5 ? new Date() : undefined,
    });
  }

  return result;
}

export function generateDummyUsers(): User[] {
  return [
    {
      id: 'user_1',
      name: 'CEO Dashboard',
      email: 'ceo@company.com',
      role: 'board',
      createdAt: new Date(),
    },
    {
      id: 'user_2',
      name: 'John Recruiter',
      email: 'recruiter@company.com',
      role: 'recruiter',
      department: 'Engineering',
      createdAt: new Date(),
    },
    {
      id: 'user_3',
      name: 'Jane Recruiter',
      email: 'jane@company.com',
      role: 'talent_manager',
      department: 'Engineering',
      createdAt: new Date(),
    },
  ];
}

export async function initializeDummyData() {
  const { db } = await import('@lib/db');
  const candidateCount = await db.candidates.count();

  if (candidateCount === 0) {
    const candidates = generateDummyCandidates(50);
    const requisitions = generateDummyRequisitions(20);
    const interviews = generateDummyInterviews(15);
    const offers = generateDummyOffers(10);
    const users = generateDummyUsers();

    await db.candidates.bulkAdd(candidates);
    await db.requisitions.bulkAdd(requisitions);
    await db.interviews.bulkAdd(interviews);
    await db.offers.bulkAdd(offers);
    await db.users.bulkAdd(users);
  }
}