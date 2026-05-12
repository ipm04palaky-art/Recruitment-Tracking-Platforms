import { create } from 'zustand';
import type { Candidate, CandidateStage, CandidateStatus } from '@types/index';
import { candidateQueries } from '@lib/db';

interface CandidateState {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  selectedCandidate: Candidate | null;
  filteredCandidates: Candidate[];
  filters: {
    stage?: CandidateStage;
    recruiter?: string;
    source?: string;
    role?: string;
    search?: string;
  };
  fetchCandidates: () => Promise<void>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (id: string, data: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  setFilters: (filters: Partial<CandidateState['filters']>) => void;
  applyFilters: () => void;
}

export const useCandidateStore = create<CandidateState>((set, get) => ({
  candidates: [],
  loading: false,
  error: null,
  selectedCandidate: null,
  filteredCandidates: [],
  filters: {},
  fetchCandidates: async () => {
    set({ loading: true, error: null });
    try {
      const candidates = await candidateQueries.getAll();
      set({ candidates, filteredCandidates: candidates });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  addCandidate: async (candidate: Candidate) => {
    try {
      await candidateQueries.create(candidate);
      const candidates = await candidateQueries.getAll();
      set({ candidates, filteredCandidates: candidates });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  updateCandidate: async (id: string, data: Partial<Candidate>) => {
    try {
      await candidateQueries.update(id, data);
      const candidates = await candidateQueries.getAll();
      set({ candidates, filteredCandidates: candidates });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  deleteCandidate: async (id: string) => {
    try {
      await candidateQueries.delete(id);
      const candidates = await candidateQueries.getAll();
      set({ candidates, filteredCandidates: candidates });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  setSelectedCandidate: (candidate: Candidate | null) => {
    set({ selectedCandidate: candidate });
  },
  setFilters: (filters: Partial<CandidateState['filters']>) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
    get().applyFilters();
  },
  applyFilters: () => {
    const { candidates, filters } = get();
    let filtered = candidates;

    if (filters.stage) {
      filtered = filtered.filter((c) => c.stage === filters.stage);
    }
    if (filters.recruiter) {
      filtered = filtered.filter((c) => c.recruiter === filters.recruiter);
    }
    if (filters.source) {
      filtered = filtered.filter((c) => c.source === filters.source);
    }
    if (filters.role) {
      filtered = filtered.filter((c) => c.roleApplied === filters.role);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search)
      );
    }

    set({ filteredCandidates: filtered });
  },
}));

interface RequisitionState {
  requisitions: any[];
  loading: boolean;
  error: string | null;
  selectedRequisition: any | null;
  filters: Record<string, any>;
  fetchRequisitions: () => Promise<void>;
  addRequisition: (req: any) => Promise<void>;
  updateRequisition: (id: string, data: any) => Promise<void>;
  setSelectedRequisition: (req: any | null) => void;
}

export const useRequisitionStore = create<RequisitionState>((set) => ({
  requisitions: [],
  loading: false,
  error: null,
  selectedRequisition: null,
  filters: {},
  fetchRequisitions: async () => {
    set({ loading: true, error: null });
    try {
      const { requisitionQueries } = await import('@lib/db');
      const requisitions = await requisitionQueries.getAll();
      set({ requisitions });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  addRequisition: async (req: any) => {
    try {
      const { requisitionQueries } = await import('@lib/db');
      await requisitionQueries.create(req);
      const requisitions = await requisitionQueries.getAll();
      set({ requisitions });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  updateRequisition: async (id: string, data: any) => {
    try {
      const { requisitionQueries } = await import('@lib/db');
      await requisitionQueries.update(id, data);
      const requisitions = await requisitionQueries.getAll();
      set({ requisitions });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  setSelectedRequisition: (req: any | null) => {
    set({ selectedRequisition: req });
  },
}));

interface InterviewState {
  interviews: any[];
  loading: boolean;
  error: string | null;
  fetchInterviews: () => Promise<void>;
  addInterview: (interview: any) => Promise<void>;
  updateInterview: (id: string, data: any) => Promise<void>;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  interviews: [],
  loading: false,
  error: null,
  fetchInterviews: async () => {
    set({ loading: true, error: null });
    try {
      const { interviewQueries } = await import('@lib/db');
      const interviews = await interviewQueries.getAll();
      set({ interviews });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  addInterview: async (interview: any) => {
    try {
      const { interviewQueries } = await import('@lib/db');
      await interviewQueries.create(interview);
      const interviews = await interviewQueries.getAll();
      set({ interviews });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  updateInterview: async (id: string, data: any) => {
    try {
      const { interviewQueries } = await import('@lib/db');
      await interviewQueries.update(id, data);
      const interviews = await interviewQueries.getAll();
      set({ interviews });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));