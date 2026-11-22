import { emptyWallet } from "./card-DMJBVK8X.mjs";
import { reconcile } from "./dropdown-menu-2jleO2R6.mjs";
// node_modules/.nitro/vite/services/ssr/assets/store-D1TB6-Pk.js
var PREFIX = "wallet-tracker:v1:";
var cache = /* @__PURE__ */ new Map();
var listeners = /* @__PURE__ */ new Set();
function storageKey(userId) {
	return PREFIX + userId;
}
function isWalletData(value) {
	if (typeof value !== "object" || value === null) return false;
	const v = value;
	return v.version === 1 && Array.isArray(v.transactions) && Array.isArray(v.categories) && Array.isArray(v.tasks) && Array.isArray(v.budgets) && Array.isArray(v.recurring) && Array.isArray(v.notifications) && typeof v.profile === "object" && typeof v.settings === "object";
}
function parseWallet(raw, fallbackName) {
	try {
		const parsed = JSON.parse(raw);
		if (!isWalletData(parsed)) return null;
		const base = emptyWallet(fallbackName);
		const value = parsed;
		return {
			...value,
			profile: {
				...base.profile,
				...value.profile
			},
			settings: {
				...base.settings,
				...value.settings
			}
		};
	} catch {
		return null;
	}
}
function notify() {
	for (const listener of listeners) listener();
}
function subscribe(listener) {
	listeners.add(listener);
	const onStorage = (event) => {
		if (event.key?.startsWith(PREFIX)) {
			cache.clear();
			listener();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", onStorage);
	};
}
function getWallet(userId, name) {
	const hit = cache.get(userId);
	if (hit) return hit;
	const raw = localStorage.getItem(storageKey(userId));
	const loaded = raw && parseWallet(raw, name) || emptyWallet(name);
	cache.set(userId, loaded);
	return loaded;
}
function updateWallet(userId, name, fn) {
	const next = reconcile(fn(getWallet(userId, name)));
	cache.set(userId, next);
	try {
		localStorage.setItem(storageKey(userId), JSON.stringify(next));
	} catch {
		console.error("Could not update the local wallet cache.");
	}
	notify();
}
function replaceWallet(userId, data) {
	cache.set(userId, data);
	localStorage.setItem(storageKey(userId), JSON.stringify(data));
	notify();
}
function clearWallet(userId, name) {
	localStorage.removeItem(storageKey(userId));
	cache.set(userId, emptyWallet(name));
	notify();
}
export { clearWallet, getWallet, parseWallet, replaceWallet, subscribe, updateWallet };
