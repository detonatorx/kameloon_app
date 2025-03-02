export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: 'CLASSIC' | 'MVT' | 'SERVER_SIDE';
  status: 'ONLINE' | 'PAUSED' | 'STOPPED' | 'DRAFT';
  siteId: number;
  siteUrl?: string;
}

export interface SortConfig {
  key: keyof Test | null;
  direction: 'asc' | 'desc';
} 
