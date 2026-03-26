export type IndexingStatus = 'idle' | 'running' | 'paused' | 'done' | 'error';

export interface URLRecord {
  url: string;
  status: 'pending' | 'success' | 'failed';
  error?: string;
  timestamp?: number;
}

export interface ConsoleEvent {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
}

export interface IndexingSessionStats {
  total: number;
  done: number;
  failed: number;
  remaining: number;
  percentage: number;
}
