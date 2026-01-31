
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Calendar, Briefcase, Settings as SettingsIcon, Plus, ChevronLeft, ChevronRight,
  Trash2, Clock, LayoutGrid, FileSpreadsheet, 
  Play, Square, AlertCircle, LogOut, User as UserIcon, 
  CalendarCheck2, ShieldCheck, Globe, Mail, Lock, UserPlus, Info, Sun, Moon, Download
} from 'lucide-react';
import { db } from './db';
import { Job, TimeEntry, Settings, ActiveSession, User } from './types';
import { 
  formatCurrency, getWeekRange, calculateDuration, formatMinutes, 
  generateICS, exportToExcel
} from './utils';

// --- Google Auth Configuration ---
const GOOGLE_CLIENT_ID = "124338330943-2kbvqt13gcadstp54oi854sf1e8io24j.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// --- Auth View ---

const AuthView = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGoogleLogin = () => {
    setLoading(true);
    setError('');
    try {
      // @ts-ignore
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: async (response: any) => {
          if (response.error) {
            setError(`Hiba: ${response.error_description || response.error}`);
            setLoading(false);
            return;
          }
          const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` }
          }).then(res => res.json());

          const user: User = {
            id: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            googleToken: response.access_token,
            googleTokenExpiry: Date.now() + (response.expires_in * 1000),
            createdAt: Date.now()
          };

          const existingUser = await db.getUserById(user.id);
          if (!existingUser) await db.registerUser(user);
          onLogin(user);
        },
      });
      client.requestAccessToken();
    } catch (err) {
      setError('Hiba a Google hitelesítés során.');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name || !email || !password) throw new Error('Tölts ki minden mezőt!');
        const newUser: User = {
          id: generateId(),
          email,
          name,
          passwordHash: password,
          createdAt: Date.now()
        };
        await db.registerUser(newUser);
        
        // Email küldés (opcionális - nem akadályozza a regisztrációt ha sikertelen)
        try {
          const emailApiUrl = 'https://munkanaplo-api.YOURNAME.workers.dev/api/register';
          await fetch(emailApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name })
          });
        } catch (emailErr) {
          console.log('Email küldés nem sikerült (ez nem akadályozza a regisztrációt):', emailErr);
        }
        
        onLogin(newUser);
      } else {
        const user = await db.getUserByEmail(email);
        if (!user || user.passwordHash !== password) throw new Error('Hibás adatok!');
        onLogin(user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-lg"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
      </button>
      
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900 mx-auto mb-4">
            <Clock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Munkanapló Pro</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Szakmai munkaidő-nyilvántartó web app</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="mb-6 flex justify-center gap-4">
             <button onClick={() => setMode('login')} className={`text-sm font-bold pb-1 transition-all ${mode === 'login' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>Bejelentkezés</button>
             <button onClick={() => setMode('register')} className={`text-sm font-bold pb-1 transition-all ${mode === 'register' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>Regisztráció</button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-100 dark:border-red-800">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
            {mode === 'register' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                <input type="text" placeholder="Név" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 pl-11 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
              <input type="email" placeholder="E-mail" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 pl-11 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
              <input type="password" placeholder="Jelszó" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 pl-11 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="mt-2 bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all disabled:opacity-50">
              {loading ? 'Folyamatban...' : (mode === 'login' ? 'Belépés' : 'Fiók létrehozása')}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-slate-300 dark:text-slate-600">
            <div className="h-[1px] bg-slate-100 dark:bg-slate-700 flex-1"></div>
            <span className="text-[10px] font-bold uppercase">vagy</span>
            <div className="h-[1px] bg-slate-100 dark:bg-slate-700 flex-1"></div>
          </div>

          <button onClick={handleGoogleLogin} disabled={loading} className="g-btn">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.172.282-1.712V4.956H.957a8.991 8.991 0 0 0 0 8.088l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.582C13.463.891 11.426 0 9 0 5.482 0 2.443 2.043.957 4.956L3.964 7.288C4.672 5.161 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Belépés Google fiókkal
          </button>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-2 text-slate-400 dark:text-slate-500">
           <ShieldCheck size={14}/>
           <span className="text-[10px] font-bold uppercase tracking-wider">Biztonságos böngésző alapú tárolás</span>
        </div>
      </div>
    </div>
  );
};

// --- Navbar ---

const Navbar = () => {
  const location = useLocation();
  const items = [
    { path: '/', icon: Calendar, label: 'Idővonal' },
    { path: '/jobs', icon: Briefcase, label: 'Projektek' },
    { path: '/history', icon: LayoutGrid, label: 'Elemzés' },
    { path: '/settings', icon: SettingsIcon, label: 'Fiók' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-slate-200 flex justify-around items-center h-16 z-[100] px-4 max-w-md mx-auto">
      {items.map(item => {
        const isActive = location.pathname === item.path || (item.path === '/' && location.pathname.startsWith('/day/'));
        return (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Card = ({ children, className = "", onClick }: any) => (
  <div onClick={onClick} className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 transition-all ${onClick ? 'active:scale-[0.98] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700' : ''} ${className}`}>
    {children}
  </div>
);

// --- Views ---

const WeeklyView = ({ jobs, entries, settings, user, refresh }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedJobId, setSelectedJobId] = useState<string>(settings.defaultJobId || '');
  const [elapsed, setElapsed] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  const { monday, sunday } = getWeekRange(currentDate);

  useEffect(() => {
    let interval: number;
    if (settings.activeSession) {
      interval = window.setInterval(() => setElapsed(Math.floor((Date.now() - settings.activeSession!.startTime) / 1000)), 1000);
    }
    return () => clearInterval(interval);
  }, [settings.activeSession]);

  useEffect(() => { if (jobs.length > 0 && (!selectedJobId || !jobs.find((j: any) => j.id === selectedJobId))) setSelectedJobId(jobs[0].id); }, [jobs, selectedJobId]);

  // PWA Install prompt kezelés
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    // Ellenőrzés hogy már telepítve van-e
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
  };

  const stopTimer = async () => {
    if (!settings.activeSession) return;
    const job = jobs.find((j: any) => j.id === settings.activeSession!.jobId);
    if (!job) return;
    const end = Date.now();
    const newEntry: TimeEntry = { 
      id: generateId(), jobId: job.id, ownerId: user.id, 
      startDateTime: new Date(settings.activeSession.startTime).toISOString(), 
      endDateTime: new Date(end).toISOString(), 
      breakMinutes: 0, rateAtTime: job.hourlyRate, currencyAtTime: job.currency, createdAt: Date.now() 
    };
    await db.saveEntry(newEntry);
    await db.saveSettings({ ...settings, activeSession: undefined });
    setElapsed(0);
    refresh();
  };

  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d; });
  const getDayTotal = (date: Date) => {
    const dayEntries = entries.filter((e: any) => e.jobId === selectedJobId && new Date(e.startDateTime).toDateString() === date.toDateString());
    const minutes = dayEntries.reduce((sum: number, e: any) => sum + calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes), 0);
    const pay = dayEntries.reduce((sum: number, e: any) => sum + (calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes) / 60 * e.rateAtTime), 0);
    return { minutes, pay, entries: dayEntries };
  };

  return (
    <div className="animate-fade-in">
      {/* Install gomb a fixed konténerbe */}
      {showInstallButton && (
        <button 
          onClick={handleInstallClick}
          className="fixed top-[72px] right-4 z-50 p-3 rounded-full bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-lg"
          title="Telepítsd az appot"
        >
          <Download size={20}/>
        </button>
      )}
      
      <header className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {user.picture ? <img src={user.picture} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" alt="P" /> : <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">{user.name[0]}</div>}
          <div><h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">Szia, {user.name.split(' ')[0]}!</h1><p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Web Dashboard</p></div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-xl text-slate-400 dark:text-slate-500"><Info size={18}/></div>
      </header>

      <Card className={`${settings.activeSession ? 'bg-slate-900 dark:bg-slate-950 border-none' : 'bg-white dark:bg-slate-800'} mb-6 !p-6 transition-all duration-300`}>
        {settings.activeSession ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-5xl font-mono font-bold text-white tracking-tighter">{new Date(elapsed * 1000).toISOString().substr(11, 8)}</div>
            <p className="text-slate-400 text-xs font-semibold">{jobs.find((j: any) => j.id === settings.activeSession?.jobId)?.name}</p>
            <button onClick={stopTimer} className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"><Square size={18} fill="currentColor" /> Megállítás</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <select className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-4 rounded-xl font-bold text-sm text-slate-900 dark:text-white outline-none" value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
              {jobs.map((j: any) => (<option key={j.id} value={j.id}>{j.name}</option>))}
            </select>
            <button onClick={async () => {
              if (!selectedJobId) return;
              await db.saveSettings({ ...settings, activeSession: { jobId: selectedJobId, startTime: Date.now() }, defaultJobId: selectedJobId });
              refresh();
            }} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50" disabled={jobs.length === 0}><Play size={18} fill="currentColor" /> Munka indítása</button>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between mb-4 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        <button onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() - 7); setCurrentDate(d); }} className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500"><ChevronLeft size={18} /></button>
        <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">{monday.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })} — {sunday.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}</div>
        <button onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() + 7); setCurrentDate(d); }} className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500"><ChevronRight size={18} /></button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {days.map(date => {
          const { minutes, pay } = getDayTotal(date);
          const isToday = new Date().toDateString() === date.toDateString();
          return (
            <Card key={date.toISOString()} className={isToday ? 'border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-900/10' : ''}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isToday ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>{date.getDate()}</div>
                   <div><p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase leading-none mb-1">{date.toLocaleDateString('hu-HU', { weekday: 'long' })}</p><h4 className="text-sm font-bold text-slate-900 dark:text-white">{date.toLocaleDateString('hu-HU', { month: 'short' })}</h4></div>
                </div>
                <div className="text-right"><p className="text-sm font-bold text-slate-900 dark:text-white">{minutes > 0 ? formatMinutes(minutes) : '--'}</p>{pay > 0 && <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{formatCurrency(pay, 'HUF')}</p>}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// --- History/Analytics View ---

const HistoryView = ({ jobs, entries, user }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const monthEntries = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    return entries.filter((e: TimeEntry) => {
      const date = new Date(e.startDateTime);
      return date.getFullYear() === year && date.getMonth() === month - 1;
    });
  }, [entries, selectedMonth]);

  const stats = useMemo(() => {
    const totalMinutes = monthEntries.reduce((sum: number, e: TimeEntry) => 
      sum + calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes), 0);
    const totalEarnings = monthEntries.reduce((sum: number, e: TimeEntry) => 
      sum + (calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes) / 60 * e.rateAtTime), 0);
    
    const byJob: Record<string, { minutes: number; earnings: number; count: number }> = {};
    monthEntries.forEach((e: TimeEntry) => {
      if (!byJob[e.jobId]) byJob[e.jobId] = { minutes: 0, earnings: 0, count: 0 };
      const mins = calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes);
      byJob[e.jobId].minutes += mins;
      byJob[e.jobId].earnings += mins / 60 * e.rateAtTime;
      byJob[e.jobId].count++;
    });

    return { totalMinutes, totalEarnings, byJob, entriesCount: monthEntries.length };
  }, [monthEntries]);

  const jobStats = useMemo(() => {
    return Object.entries(stats.byJob).map(([jobId, data]) => {
      const job = jobs.find((j: Job) => j.id === jobId);
      return { job, ...data };
    }).sort((a, b) => b.minutes - a.minutes);
  }, [stats.byJob, jobs]);

  const getMonthOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    return options;
  };

  return (
    <div className="animate-fade-in pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Elemzés</h1>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {getMonthOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="!p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Ledolgozott</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{formatMinutes(stats.totalMinutes)}</h3>
            </div>
          </div>
        </Card>

        <Card className="!p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Ft</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Bevétel</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.totalEarnings, 'HUF')}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Job Breakdown */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Munkák szerinti bontás</h2>
      {jobStats.length === 0 ? (
        <Card className="!p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="text-slate-400 dark:text-slate-500" size={24} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Még nincsenek időbejegyzések ebben a hónapban.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {jobStats.map(({ job, minutes, earnings, count }) => {
            if (!job) return null;
            const percentage = (minutes / stats.totalMinutes) * 100;
            return (
              <Card key={job.id} className="!p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${job.color}20`, color: job.color }}>
                      {job.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{job.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{count} munkamenet</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{formatMinutes(minutes)}</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(earnings, job.currency)}</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${percentage}%`, backgroundColor: job.color }}
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 text-right">{percentage.toFixed(1)}%</p>
              </Card>
            );
          })}
        </div>
      )}

      {/* Recent Entries */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 mt-8">Legutóbbi bejegyzések</h2>
      <div className="flex flex-col gap-2">
        {monthEntries.slice(0, 10).map((entry: TimeEntry) => {
          const job = jobs.find((j: Job) => j.id === entry.jobId);
          if (!job) return null;
          const duration = calculateDuration(entry.startDateTime, entry.endDateTime, entry.breakMinutes);
          const earnings = duration / 60 * entry.rateAtTime;
          const date = new Date(entry.startDateTime);
          return (
            <Card key={entry.id} className="!p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${job.color}20`, color: job.color }}>
                  {job.emoji}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{date.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric', weekday: 'short' })}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{formatMinutes(duration)}</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(earnings, entry.currencyAtTime)}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// --- Settings View ---

const SettingsView = ({ settings, refresh, user, onLogout }: any) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Fiókbeállítások</h1>
      <Card className="flex items-center justify-between mb-6 !p-5">
        <div className="flex items-center gap-4">
          {user.picture ? <img src={user.picture} className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700" alt="Avatar" /> : <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">{user.name[0]}</div>}
          <div><h3 className="font-bold text-slate-800 dark:text-white">{user.name}</h3><p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{user.email}</p></div>
        </div>
        <button onClick={async () => { if (confirm('Kijelentkezel?')) { await db.saveSettings({ ...settings, currentUserId: undefined }); onLogout(); } }} className="w-10 h-10 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-xl flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"><LogOut size={18} /></button>
      </Card>

      <section className="mb-6">
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 mb-2">Adatkezelés</h3>
        <Card className="flex flex-col gap-2">
           <button onClick={async () => exportToExcel(await db.getFullBackupData(user.id))} className="flex items-center gap-3 p-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all"><FileSpreadsheet size={18} className="text-emerald-500" /> Adatok exportálása (.xlsx)</button>
           <button onClick={() => generateICS()} className="flex items-center gap-3 p-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all"><Calendar size={18} className="text-blue-500" /> Google Calendar emlékeztetők</button>
        </Card>
      </section>

      <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-3xl text-white flex items-center justify-between shadow-xl">
        <div><p className="text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-widest mb-1">Rendszer</p><div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full"></div><span className="text-xs font-bold uppercase tracking-tight">Standard Web App</span></div></div>
        <Globe size={24} className="text-slate-800 dark:text-slate-700" />
      </div>
    </div>
  );
};

// --- Jobs View ---

const JobsView = ({ jobs, user, refresh }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [currency, setCurrency] = useState<'HUF' | 'EUR' | 'USD'>('HUF');
  const [emoji, setEmoji] = useState('💼');
  const [color, setColor] = useState('#3b82f6');

  const openModal = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setName(job.name || job.title || '');
      setRate(job.hourlyRate.toString());
      setCurrency(job.currency);
      setEmoji(job.emoji || '💼');
      setColor(job.color || '#3b82f6');
    } else {
      setEditingJob(null);
      setName('');
      setRate('');
      setCurrency('HUF');
      setEmoji('💼');
      setColor('#3b82f6');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setName('');
    setRate('');
    setCurrency('HUF');
    setEmoji('💼');
    setColor('#3b82f6');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      id: editingJob?.id || generateId(),
      ownerId: user.id,
      name,
      title: name,
      hourlyRate: parseFloat(rate),
      currency,
      emoji,
      color,
      isActive: true,
      createdAt: editingJob?.createdAt || Date.now()
    };
    await db.saveJob(jobData);
    closeModal();
    refresh();
  };

  const emojis = ['💼', '💻', '🎨', '📱', '🏗️', '📊', '✍️', '🎯', '⚙️', '🚀'];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projektjeim</h1>
        <button onClick={() => openModal()} className="w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="flex flex-col gap-2">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 font-bold">Nincs még hozzáadott projekt.</div>
        ) : (
          jobs.map((j: any) => (
            <Card key={j.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${j.color}20`, color: j.color }}>
                  {j.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{j.name || j.title}</h4>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{formatCurrency(j.hourlyRate, j.currency)}/óra</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openModal(j)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                  <SettingsIcon size={16} />
                </button>
                <button onClick={() => confirm('Biztosan törlöd?') && db.deleteJob(j.id).then(refresh)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-900/95 dark:bg-black/95 backdrop-blur-lg" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-8 shadow-2xl animate-fade-in my-4 border border-slate-200 dark:border-slate-700">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              {editingJob ? 'Projekt szerkesztése' : 'Új projekt hozzáadása'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Emoji és Szín választók - nagyobb gapekkel */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 block">Emoji</label>
                  <div className="grid grid-cols-5 gap-3">
                    {emojis.map(e => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setEmoji(e)}
                        className={`h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${emoji === e ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500 scale-110' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 block">Szín</label>
                  <div className="grid grid-cols-8 gap-3">
                    {colors.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`h-12 rounded-xl transition-all ${color === c ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-500 scale-110' : ''}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 block">Projekt neve</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="pl. Webfejlesztés"
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-4 rounded-xl font-bold text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 block">Óradíj</label>
                  <input
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                    type="number"
                    step="0.01"
                    placeholder="5000"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-4 rounded-xl font-bold text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 block">Valuta</label>
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value as 'HUF' | 'EUR' | 'USD')}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-4 rounded-xl font-bold text-base text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="HUF">HUF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 rounded-xl mt-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
              >
                {editingJob ? 'Mentés' : 'Létrehozás'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- App Root ---

const AppContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  const loadData = useCallback(async (uid?: string) => {
    try {
      await db.init();
      await db.ensureTestUser(); // Teszt user létrehozása
      const s = await db.getSettings();
      setSettings(s);
      const targetId = uid || s.currentUserId;
      if (targetId) {
        const u = await db.getUserById(targetId);
        if (u) {
          setUser(u);
          const [j, e] = await Promise.all([db.getJobs(u.id), db.getEntries(u.id)]);
          setJobs(j); setEntries(e);
        }
      }
      setReady(true);
    } catch { setReady(true); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (!ready) return <div className="min-h-screen flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Rendszer betöltése...</div>;
  if (!user) return <AuthView onLogin={async (u) => { 
    await db.saveSettings({ ...settings, currentUserId: u.id }); 
    await loadData(u.id); 
  }} />;

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 px-6 pt-8 bg-white dark:bg-slate-900 transition-colors">
      {/* Fixed Buttons - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-lg"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
        </button>
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="p-3 rounded-full bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-lg"
            title="Telepítsd az appot"
          >
            <Download size={20} />
          </button>
        )}
      </div>
      
      <Routes>
        <Route path="/" element={<WeeklyView jobs={jobs} entries={entries} settings={settings} user={user} refresh={loadData} />} />
        <Route path="/jobs" element={<JobsView jobs={jobs} user={user} refresh={loadData} />} />
        <Route path="/history" element={<HistoryView jobs={jobs} entries={entries} user={user} />} />
        <Route path="/settings" element={<SettingsView settings={settings} refresh={loadData} user={user} onLogout={() => setUser(null)} />} />
      </Routes>
      <Navbar />
    </div>
  );
};

export default function App() { return (<HashRouter><AppContent /></HashRouter>); }
