import { emptyWallet } from "./defaults.ts";
import { reconcile } from "./reconcile.ts";
import type { WalletData } from "./types.ts";

const PREFIX = "wallet-tracker:v1:";
const cache = new Map<string, WalletData>();
const listeners = new Set<() => void>();
function storageKey(userId: string) { return PREFIX + userId; }
function isWalletData(value: unknown): value is WalletData {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.version === 1 && Array.isArray(v.transactions) && Array.isArray(v.categories) &&
    Array.isArray(v.tasks) && Array.isArray(v.budgets) && Array.isArray(v.recurring) &&
    Array.isArray(v.notifications) && typeof v.profile === "object" && typeof v.settings === "object";
}
export function parseWallet(raw: string, fallbackName: string): WalletData | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isWalletData(parsed)) return null;
    const base = emptyWallet(fallbackName);
    const value = parsed as WalletData;
    return { ...value, profile: { ...base.profile, ...value.profile }, settings: { ...base.settings, ...value.settings } };
  } catch { return null; }
}
function notify() { for (const listener of listeners) listener(); }
export function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => { if (event.key?.startsWith(PREFIX)) { cache.clear(); listener(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
export function getWallet(userId: string, name: string) {
  const hit = cache.get(userId); if (hit) return hit;
  const raw = localStorage.getItem(storageKey(userId));
  const loaded = (raw && parseWallet(raw, name)) || emptyWallet(name);
  cache.set(userId, loaded); return loaded;
}
export function updateWallet(userId: string, name: string, fn: (data: WalletData) => WalletData) {
  const next = reconcile(fn(getWallet(userId, name)));
  cache.set(userId, next);
  try { localStorage.setItem(storageKey(userId), JSON.stringify(next)); }
  catch { console.error("Could not update the local wallet cache."); }
  notify();
}
export function replaceWallet(userId: string, data: WalletData) {
  cache.set(userId, data);
  localStorage.setItem(storageKey(userId), JSON.stringify(data));
  notify();
}
export function clearWallet(userId: string, name: string) {
  localStorage.removeItem(storageKey(userId));
  cache.set(userId, emptyWallet(name));
  notify();
}
