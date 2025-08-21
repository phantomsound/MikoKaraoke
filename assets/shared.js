
// Shared config
export const SUPABASE_URL = "https://ggntnabyoxcmveflntov.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbnRuYWJ5b3hjbXZlZmxudG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDQ0MDQsImV4cCI6MjA3MTI4MDQwNH0.67_zYVJIr_XJXELRqBWnUBqvoHSBP2cEUvJVnrIk5lU";
export const VENMO_URL = "https://account.venmo.com/pay?recipients=kjtherapist";
export const CASHAPP_URL = "https://cash.app/$fatfellacash";

// PIN management (device-local)
export const DEFAULT_PIN = "123456";
export const MASTER_PIN  = "03861745";
const LS_PIN = 'mk:adminPin';
const SS_UNLOCKED = 'mk:unlocked';

export function getPin(){ return localStorage.getItem(LS_PIN) || DEFAULT_PIN; }
export function setPin(v){ localStorage.setItem(LS_PIN, String(v)); }
export function isUnlocked(){ return sessionStorage.getItem(SS_UNLOCKED) === '1'; }
export function setUnlocked(on){ if(on) sessionStorage.setItem(SS_UNLOCKED,'1'); else sessionStorage.removeItem(SS_UNLOCKED); }
export function unlockWith(pin){ return pin === getPin() || pin === MASTER_PIN; }

export function escapeHtml(s){ return (s||'').replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
export function isSameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

// Supabase client
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wire tipping links in header if present
export function wireTipLinks() {
  const v = document.getElementById('tipVenmo');
  const c = document.getElementById('tipCashApp');
  if(v) v.href = VENMO_URL;
  if(c) c.href = CASHAPP_URL;
}

// Simple nav active state (header/footer)
export function setActiveNav(pathname) {
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')===pathname));
  document.querySelectorAll('.sitemap a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')===pathname));
}

// CSV helper
export function downloadCsv(name, rows) {
  const csv = rows.map(r=>r.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

// Realtime helper
export function setupRealtime(handlers) {
  const channel = supabase.channel('queue-changes')
    .on('postgres_changes', { event:'*', schema:'public', table:'signups' }, handlers.onSignups || (()=>{}))
    .on('postgres_changes', { event:'*', schema:'public', table:'now_playing' }, handlers.onNow || (()=>{}))
    .on('postgres_changes', { event:'*', schema:'public', table:'history' }, handlers.onHistory || (()=>{}))
    .subscribe();
  return channel;
}
