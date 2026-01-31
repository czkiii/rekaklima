
export type Currency = 'HUF' | 'USD' | 'EUR';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash?: string; // E-mailes regisztrációhoz
  picture?: string;
  googleToken?: string; // OAuth Access Token
  googleTokenExpiry?: number;
  createdAt: number;
}

export interface Job {
  id: string;
  ownerId: string;
  name: string; // Ügyfél neve
  title?: string; // Backwards compatibility
  hourlyRate: number;
  currency: Currency;
  emoji?: string;
  color?: string;
  notes?: string; // Jegyzetek az ügyfélről
  isActive: boolean;
  createdAt: number;
}

export interface TimeEntry {
  id: string;
  jobId: string;
  ownerId: string;
  startDateTime: string;
  endDateTime: string;
  breakMinutes: number;
  projectName?: string; // Projekt neve
  notes?: string; // Részletes leírás
  rateAtTime: number;
  currencyAtTime: Currency;
  syncedToCalendar?: boolean;
  calendarEventId?: string;
  createdAt: number;
}

export interface ActiveSession {
  jobId: string;
  startTime: number;
}

export interface Settings {
  lastBackupAt?: number;
  defaultJobId?: string;
  activeSession?: ActiveSession;
  currentUserId?: string;
  autoSyncCalendar?: boolean;
}
