import Dexie, { Table } from 'dexie';
import type {
  Candidate,
  Requisition,
  Interview,
  Offer,
  User,
} from '@types/index';

export class RecruitmentDB extends Dexie {
  candidates!: Table<Candidate>;
  requisitions!: Table<Requisition>;
  interviews!: Table<Interview>;
  offers!: Table<Offer>;
  users!: Table<User>;

  constructor() {
    super('VanguardRecruitmentDB');
    this.version(1).stores({
      candidates: '++id, email, recruiter, stage, source, createdAt',
      requisitions: '++id, department, status, priority, deadline',
      interviews: '++id, candidateId, status, date',
      offers: '++id, candidateId, status',
      users: '++id, email, role',
    });
  }
}

export const db = new RecruitmentDB();

// Query helpers
export const candidateQueries = {
  async getAll() {
    return db.candidates.toArray();
  },
  async getById(id: string) {
    return db.candidates.get(id);
  },
  async getByStage(stage: string) {
    return db.candidates.where('stage').equals(stage).toArray();
  },
  async getByRecruiter(recruiter: string) {
    return db.candidates.where('recruiter').equals(recruiter).toArray();
  },
  async getByRole(role: string) {
    return db.candidates.filter(c => c.roleApplied === role).toArray();
  },
  async create(candidate: Candidate) {
    return db.candidates.add(candidate);
  },
  async update(id: string, data: Partial<Candidate>) {
    return db.candidates.update(id, data);
  },
  async delete(id: string) {
    return db.candidates.delete(id);
  },
};

export const requisitionQueries = {
  async getAll() {
    return db.requisitions.toArray();
  },
  async getById(id: string) {
    return db.requisitions.get(id);
  },
  async getByStatus(status: string) {
    return db.requisitions.where('status').equals(status).toArray();
  },
  async getByDepartment(department: string) {
    return db.requisitions.where('department').equals(department).toArray();
  },
  async create(requisition: Requisition) {
    return db.requisitions.add(requisition);
  },
  async update(id: string, data: Partial<Requisition>) {
    return db.requisitions.update(id, data);
  },
  async delete(id: string) {
    return db.requisitions.delete(id);
  },
};

export const interviewQueries = {
  async getAll() {
    return db.interviews.toArray();
  },
  async getByCandidateId(candidateId: string) {
    return db.interviews.where('candidateId').equals(candidateId).toArray();
  },
  async getByStatus(status: string) {
    return db.interviews.where('status').equals(status).toArray();
  },
  async create(interview: Interview) {
    return db.interviews.add(interview);
  },
  async update(id: string, data: Partial<Interview>) {
    return db.interviews.update(id, data);
  },
  async delete(id: string) {
    return db.interviews.delete(id);
  },
};

export const offerQueries = {
  async getAll() {
    return db.offers.toArray();
  },
  async getByCandidateId(candidateId: string) {
    return db.offers.where('candidateId').equals(candidateId).toArray();
  },
  async getByStatus(status: string) {
    return db.offers.where('status').equals(status).toArray();
  },
  async create(offer: Offer) {
    return db.offers.add(offer);
  },
  async update(id: string, data: Partial<Offer>) {
    return db.offers.update(id, data);
  },
  async delete(id: string) {
    return db.offers.delete(id);
  },
};

export const userQueries = {
  async getAll() {
    return db.users.toArray();
  },
  async getById(id: string) {
    return db.users.get(id);
  },
  async getByRole(role: string) {
    return db.users.where('role').equals(role).toArray();
  },
  async create(user: User) {
    return db.users.add(user);
  },
  async update(id: string, data: Partial<User>) {
    return db.users.update(id, data);
  },
};