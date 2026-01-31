
import { TimeEntry, Job, Settings } from './types';
import * as XLSX from 'xlsx';

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getWeekRange = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday adjustment
  const monday = new Date(start.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

export const calculateDuration = (start: string, end: string, breakMinutes: number) => {
  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  const totalMinutes = Math.max(0, (diffMs / 1000 / 60) - breakMinutes);
  return totalMinutes;
};

export const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}ó ${m}p`;
};

export const downloadFile = (content: Blob | string, fileName: string, contentType: string) => {
  const a = document.createElement("a");
  const file = content instanceof Blob ? content : new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const generateICS = () => {
  // Két emlékeztető hozzáadása Google Calendar-hoz
  const events = [
    {
      title: 'Munkanapló Backup (Hétfő)',
      description: 'Ne felejtsd el elmenteni az adataidat!',
      time: '09:00',
      day: 'Monday'
    },
    {
      title: 'Munkanapló Backup (Péntek)',
      description: 'Heti zárás és biztonsági mentés.',
      time: '17:00',
      day: 'Friday'
    }
  ];

  // Első esemény hozzáadása Google Calendar-ba
  const firstEvent = events[0];
  const now = new Date();
  
  // Következő hétfő keresése
  const nextMonday = new Date(now);
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(9, 0, 0, 0);

  // Google Calendar URL formátum: YYYYMMDDTHHMMSS
  const formatGoogleDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00`;
  };

  const startDate = formatGoogleDate(nextMonday);
  const endDate = formatGoogleDate(new Date(nextMonday.getTime() + 30 * 60000)); // 30 perc később

  // Google Calendar URL összeállítása
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: firstEvent.title,
    details: firstEvent.description + '\n\n💡 Emlékeztető: Hétfőnként és péntekenként mentsd el az adataidat!',
    dates: `${startDate}/${endDate}`,
    recur: 'RRULE:FREQ=WEEKLY;BYDAY=MO',
    ctz: 'Europe/Budapest'
  });

  // Új ablak megnyitása Google Calendar-ral
  window.open(`${baseUrl}?${params.toString()}`, '_blank');

  // Második esemény is megnyitható (opcionális)
  setTimeout(() => {
    const nextFriday = new Date(now);
    const daysUntilFriday = (12 - now.getDay()) % 7 || 5;
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(17, 0, 0, 0);

    const startDateFri = formatGoogleDate(nextFriday);
    const endDateFri = formatGoogleDate(new Date(nextFriday.getTime() + 30 * 60000));

    const paramsFri = new URLSearchParams({
      action: 'TEMPLATE',
      text: events[1].title,
      details: events[1].description,
      dates: `${startDateFri}/${endDateFri}`,
      recur: 'RRULE:FREQ=WEEKLY;BYDAY=FR',
      ctz: 'Europe/Budapest'
    });

    if (confirm('Hozzáadod a péntek esti emlékeztetőt is?')) {
      window.open(`${baseUrl}?${paramsFri.toString()}`, '_blank');
    }
  }, 500);
};

/**
 * CSV String generálása
 */
export const getCSVString = (entries: TimeEntry[]) => {
  if (entries.length === 0) return "";
  const bom = "\uFEFF";
  const header = "Dátum,Kezdet,Vége,Szünet(perc),Nettó perc,Díj,Pénznem,Megjegyzés\n";
  const rows = entries.map(e => {
    const start = new Date(e.startDateTime);
    const end = new Date(e.endDateTime);
    const dur = calculateDuration(e.startDateTime, e.endDateTime, e.breakMinutes);
    return `${start.toLocaleDateString('hu-HU')},${start.toLocaleTimeString('hu-HU')},${end.toLocaleTimeString('hu-HU')},${e.breakMinutes},${dur.toFixed(0)},${e.rateAtTime},${e.currencyAtTime},"${(e.notes || '').replace(/"/g, '""')}"`;
  }).join("\n");
  return bom + header + rows;
};

export const generateCSV = (entries: TimeEntry[], jobName: string, dateRangeLabel?: string) => {
  const content = getCSVString(entries);
  if (!content) return false;
  const fileName = `export_${jobName.replace(/\s+/g, '_')}_${dateRangeLabel || new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(content, fileName, "text/csv;charset=utf-8");
  return true;
};

/**
 * Helyi mappa írása (Chrome/Edge/Desktop)
 */
export const saveToDirectory = async (jobs: Job[], entries: TimeEntry[], dateRangeLabel: string) => {
  try {
    // @ts-ignore
    const dirHandle = await window.showDirectoryPicker();
    for (const job of jobs) {
      const jobEntries = entries.filter(e => e.jobId === job.id);
      if (jobEntries.length > 0) {
        const csvContent = getCSVString(jobEntries);
        const fileName = `${job.name.replace(/\s+/g, '_')}_${dateRangeLabel}.csv`;
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(csvContent);
        await writable.close();
      }
    }
    return true;
  } catch (err) {
    console.error("Mappa hiba:", err);
    return false;
  }
};

export const importFromCSV = async (file: File): Promise<Partial<TimeEntry>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter(l => l.trim() !== "");
        const rows = lines.slice(1);
        const entries: Partial<TimeEntry>[] = rows.map(row => {
          const parts = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (parts.length < 7) return {};
          const datePart = parts[0].trim().replace(/\s/g, ''); 
          const startPart = parts[1].trim(); 
          const endPart = parts[2].trim();
          const brk = parseInt(parts[3]) || 0;
          const rate = parseFloat(parts[5]) || 0;
          const curr = parts[6].trim() as any;
          const note = parts[7] ? parts[7].replace(/^"|"$/g, '').replace(/""/g, '"') : "";
          const dMatch = datePart.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})\./);
          if (!dMatch) return {};
          const isoDate = `${dMatch[1]}-${dMatch[2].padStart(2, '0')}-${dMatch[3].padStart(2, '0')}`;
          return { startDateTime: `${isoDate}T${startPart}`, endDateTime: `${isoDate}T${endPart}`, breakMinutes: brk, rateAtTime: rate, currencyAtTime: curr, notes: note, createdAt: Date.now() };
        }).filter(e => e.startDateTime);
        resolve(entries);
      } catch (err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const exportToExcel = (data: { jobs: Job[], entries: TimeEntry[], settings: Settings }) => {
  const wb = XLSX.utils.book_new();
  const jobsSheet = XLSX.utils.json_to_sheet(data.jobs);
  XLSX.utils.book_append_sheet(wb, jobsSheet, "Projektek");
  const entriesSheet = XLSX.utils.json_to_sheet(data.entries);
  XLSX.utils.book_append_sheet(wb, entriesSheet, "Bejegyzések");
  const settingsArray = Object.entries(data.settings).map(([key, value]) => ({ kulcs: key, ertek: typeof value === 'object' ? JSON.stringify(value) : value }));
  const settingsSheet = XLSX.utils.json_to_sheet(settingsArray);
  XLSX.utils.book_append_sheet(wb, settingsSheet, "Beallitasok");
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(blob, `munkanaplo_teljes_backup_${dateStr}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
};

export const importFromExcel = async (file: File): Promise<{ jobs: Job[], entries: TimeEntry[], settings: Settings }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const jobs = XLSX.utils.sheet_to_json(workbook.Sheets["Projektek"]) as Job[];
        const entries = XLSX.utils.sheet_to_json(workbook.Sheets["Bejegyzések"]) as TimeEntry[];
        const settingsRaw = XLSX.utils.sheet_to_json(workbook.Sheets["Beallitasok"]) as { kulcs: string, ertek: any }[];
        const settings: Settings = {};
        settingsRaw.forEach(item => {
          try { (settings as any)[item.kulcs] = JSON.parse(item.ertek); } catch { (settings as any)[item.kulcs] = item.ertek; }
        });
        if (!jobs || !entries) throw new Error("Hibás fájlstruktúra!");
        resolve({ jobs, entries, settings });
      } catch (err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
