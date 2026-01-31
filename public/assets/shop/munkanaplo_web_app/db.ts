
import { Job, TimeEntry, Settings, User } from './types';

const DB_NAME = 'WorkTrackerDB_v3'; // Verzió emelés a tiszta kezdéshez
const DB_VERSION = 1;

export class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        
        // Felhasználók tábla
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
        
        // Projektek tábla
        if (!db.objectStoreNames.contains('jobs')) {
          const jobStore = db.createObjectStore('jobs', { keyPath: 'id' });
          jobStore.createIndex('ownerId', 'ownerId', { unique: false });
        }
        
        // Bejegyzések tábla
        if (!db.objectStoreNames.contains('entries')) {
          const entryStore = db.createObjectStore('entries', { keyPath: 'id' });
          entryStore.createIndex('jobId', 'jobId', { unique: false });
          entryStore.createIndex('ownerId', 'ownerId', { unique: false });
          entryStore.createIndex('startDateTime', 'startDateTime', { unique: false });
        }
        
        // Beállítások tábla
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event: any) => {
        console.error('IndexedDB hiba:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async ensureTestUser(): Promise<void> {
    try {
      const testUser = await this.getUserByEmail('test@test.hu');
      if (!testUser) {
        await this.registerUser({
          id: 'test-user-id',
          email: 'test@test.hu',
          name: 'Test User',
          passwordHash: 'test',
          createdAt: Date.now()
        });
      }
    } catch (err) {
      console.log('Test user already exists or creation failed:', err);
    }
  }

  private getStore(name: string, mode: IDBTransactionMode = 'readonly') {
    if (!this.db) throw new Error('DB nincs inicializálva');
    const transaction = this.db.transaction(name, mode);
    return transaction.objectStore(name);
  }

  // --- Auth Methods ---
  async registerUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.getStore('users', 'readwrite');
        const request = store.add(user);
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => {
          if (e.target.error.name === 'ConstraintError') {
            reject(new Error('Ez az email már foglalt!'));
          } else {
            reject(e.target.error);
          }
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.getStore('users');
        const index = store.index('email');
        const request = index.get(email);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('users').get(id);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // --- Scoped Data Methods ---
  async getJobs(ownerId: string): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      try {
        const index = this.getStore('jobs').index('ownerId');
        const request = index.getAll(ownerId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async saveJob(job: Job): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('jobs', 'readwrite').put(job);
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteJob(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('jobs', 'readwrite').delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getEntries(ownerId: string): Promise<TimeEntry[]> {
    return new Promise((resolve, reject) => {
      try {
        const index = this.getStore('entries').index('ownerId');
        const request = index.getAll(ownerId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async saveEntry(entry: TimeEntry): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('entries', 'readwrite').put(entry);
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteEntry(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('entries', 'readwrite').delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getSettings(): Promise<Settings> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('settings').get('app_settings');
        request.onsuccess = () => resolve(request.result?.value || {});
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async saveSettings(settings: Settings): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = this.getStore('settings', 'readwrite').put({ key: 'app_settings', value: settings });
        request.onsuccess = () => resolve();
        request.onerror = (e: any) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getFullBackupData(ownerId: string) {
    const jobs = await this.getJobs(ownerId);
    const entries = await this.getEntries(ownerId);
    const settings = await this.getSettings();
    return { jobs, entries, settings };
  }

  async importAllData(data: { jobs: Job[], entries: TimeEntry[], settings: Settings }): Promise<void> {
    const jobStore = this.getStore('jobs', 'readwrite');
    const entryStore = this.getStore('entries', 'readwrite');
    for (const job of data.jobs) jobStore.put(job);
    for (const entry of data.entries) entryStore.put(entry);
    await this.saveSettings(data.settings);
  }
}

export const db = new Database();
