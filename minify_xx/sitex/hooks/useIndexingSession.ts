"use client";

import { create } from 'zustand';
import { 
  IndexingStatus, 
  URLRecord, 
  ConsoleEvent, 
  IndexingSessionStats 
} from '@/types/sitex';

interface IndexingSessionState {
  status: IndexingStatus;
  urls: URLRecord[];
  currentIndex: number;
  consoleLogs: ConsoleEvent[];
  stats: IndexingSessionStats;

  // Actions
  setStatus: (status: IndexingStatus) => void;
  loadUrls: (urls: string[]) => void;
  updateUrlStatus: (index: number, status: 'success' | 'failed', error?: string) => void;
  addConsoleLog: (type: 'info' | 'success' | 'error' | 'warning', message: string) => void;
  setCurrentIndex: (index: number) => void;
  resetSession: () => void;
}

const initialStats: IndexingSessionStats = {
  total: 0,
  done: 0,
  failed: 0,
  remaining: 0,
  percentage: 0
};

export const useIndexingSession = create<IndexingSessionState>((set, get) => ({
  status: 'idle',
  urls: [],
  currentIndex: 0,
  consoleLogs: [],
  stats: initialStats,

  setStatus: (status) => set({ status }),

  loadUrls: (urls) => {
    const freshUrls: URLRecord[] = urls.map(u => ({ url: u, status: 'pending' }));
    set({ 
      urls: freshUrls, 
      currentIndex: 0,
      status: 'idle',
      stats: {
        total: freshUrls.length,
        done: 0,
        failed: 0,
        remaining: freshUrls.length,
        percentage: 0
      }
    });
  },

  updateUrlStatus: (index, status, error) => {
    const { urls } = get();
    const newUrls = [...urls];
    if (newUrls[index]) {
      newUrls[index] = { ...newUrls[index], status, error, timestamp: Date.now() };
    }

    const doneCount = newUrls.filter(u => u.status === 'success').length;
    const failedCount = newUrls.filter(u => u.status === 'failed').length;
    const totalCount = newUrls.length;
    
    set({ 
      urls: newUrls,
      stats: {
        total: totalCount,
        done: doneCount,
        failed: failedCount,
        remaining: totalCount - (doneCount + failedCount),
        percentage: totalCount > 0 ? Math.round(((doneCount + failedCount) / totalCount) * 100) : 0
      }
    });
  },

  addConsoleLog: (type, message) => {
    const newLog: ConsoleEvent = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    set(state => ({ 
      consoleLogs: [...state.consoleLogs.slice(-49), newLog] // Keep last 50
    }));
  },

  setCurrentIndex: (currentIndex) => set({ currentIndex }),

  resetSession: () => set({
    status: 'idle',
    urls: [],
    currentIndex: 0,
    consoleLogs: [],
    stats: initialStats
  })
}));
