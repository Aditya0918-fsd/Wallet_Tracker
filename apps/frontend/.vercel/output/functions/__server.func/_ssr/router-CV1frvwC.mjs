import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useLocation } from "../_libs/@tanstack/react-router+[2...].mjs";
import { Outlet, ScriptOnce, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { QueryClientProvider, useQueryErrorResetBoundary } from "../_libs/tanstack__react-query.mjs";
import { Button, TooltipProvider as TooltipProvider$1 } from "../_libs/@base-ui/react+[2...].mjs";
import { clsx, cva } from "../_libs/class-variance-authority+clsx.mjs";
import { twMerge } from "../_libs/tailwind-merge.mjs";
import { create } from "../_libs/zustand.mjs";
import { Toaster } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { _enum, object, string } from "../_libs/zod.mjs";
// node_modules/.nitro/vite/services/ssr/assets/api-PpujQXLR.js
var API = "/api".replace(/\/$/, "");
function apiHref(path) {
	return API + path;
}
function readCookie(name) {
	return document.cookie.split("; ").find((item) => item.startsWith(name + "="))?.slice(name.length + 1);
}
async function csrfToken() {
	const current = readCookie("wallet_csrf");
	if (current) return decodeURIComponent(current);
	const response = await fetch(apiHref("/auth/csrf"), { credentials: "include" });
	if (!response.ok) throw new Error("Could not initialize secure request.");
	return (await response.json()).token;
}
async function apiRequest(path, init = {}) {
	const headers = new Headers(init.headers);
	if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
	if (init.method && ![
		"GET",
		"HEAD",
		"OPTIONS"
	].includes(init.method.toUpperCase())) headers.set("x-csrf-token", await csrfToken());
	const response = await fetch(apiHref(path), {
		...init,
		headers,
		credentials: "include"
	});
	const body = (response.headers.get("content-type") || "").includes("application/json") ? await response.json() : await response.text();
	if (!response.ok) {
		const message = typeof body === "object" && body !== null && "message" in body ? String(body.message) : "The request failed. Please try again.";
		throw new Error(message);
	}
	return body;
}
// node_modules/.nitro/vite/services/ssr/assets/money-uTbhlxdW.js
/**
* Parses a user-typed amount ("1,234.5") into integer paise without going
* through float multiplication. Returns null for invalid or non-positive input.
*/
function parseAmountToMinor(input) {
	const cleaned = input.replace(/[,\s₹$€£]/g, "");
	if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return null;
	const [whole, frac = ""] = cleaned.split(".");
	const minor = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
	if (!Number.isSafeInteger(minor) || minor <= 0) return null;
	return minor;
}
/** Integer paise to an editable string, e.g. 123450 -> "1234.50". */
function minorToInput(minor) {
	const sign = minor < 0 ? "-" : "";
	const abs = Math.abs(minor);
	return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}
var CURRENCIES = [
	{
		code: "INR",
		label: "Indian Rupee (₹)"
	},
	{
		code: "USD",
		label: "US Dollar ($)"
	},
	{
		code: "EUR",
		label: "Euro (€)"
	},
	{
		code: "GBP",
		label: "British Pound (£)"
	},
	{
		code: "JPY",
		label: "Japanese Yen (¥)"
	},
	{
		code: "AED",
		label: "UAE Dirham (AED)"
	},
	{
		code: "AUD",
		label: "Australian Dollar (A$)"
	},
	{
		code: "CAD",
		label: "Canadian Dollar (C$)"
	},
	{
		code: "SGD",
		label: "Singapore Dollar (S$)"
	}
];
function formatMoney(minor, fmt, opts = {}) {
	return new Intl.NumberFormat(fmt.locale, {
		style: "currency",
		currency: fmt.currency,
		currencyDisplay: opts.code ? "code" : "symbol",
		notation: opts.compact ? "compact" : "standard",
		maximumFractionDigits: opts.compact ? 1 : 2,
		minimumFractionDigits: opts.compact ? 0 : 2,
		signDisplay: opts.signed ? "exceptZero" : "auto"
	}).format(minor / 100);
}
// node_modules/.nitro/vite/services/ssr/assets/router-CV1frvwC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
			lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-9",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function RouteError({ error, reset }) {
	const router = useRouter();
	const queryErrorResetBoundary = useQueryErrorResetBoundary();
	const retry = (0, import_react.useCallback)(() => {
		queryErrorResetBoundary.reset();
		reset();
		router.invalidate();
	}, [
		queryErrorResetBoundary,
		reset,
		router
	]);
	(0, import_react.useEffect)(() => {
		console.error("[Runtime Error]", error);
	}, [error]);
	(0, import_react.useEffect)(() => {}, [retry]);
	error instanceof Error && error.message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "Something went wrong"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "This page ran into a problem. Try again in a moment."
					})]
				}),
				null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					onClick: retry,
					children: "Try again"
				})
			]
		})
	});
}
var useAuthStore = create((set) => ({
	user: null,
	loading: true,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading })
}));
async function refreshAuth() {
	const { setUser, setLoading } = useAuthStore.getState();
	try {
		const response = await apiRequest("/auth/me");
		const parts = response.name.trim().split(/\s+/);
		setUser({
			...response,
			firstName: parts[0] || "",
			lastName: parts.slice(1).join(" ")
		});
	} catch {
		setUser(null);
	} finally {
		setLoading(false);
	}
}
async function signOut(options) {
	await apiRequest("/auth/logout", { method: "POST" });
	useAuthStore.getState().setUser(null);
	if (options?.returnTo) window.location.assign(options.returnTo);
}
function AuthProvider({ children, initialAuth }) {
	(0, import_react.useEffect)(() => {
		refreshAuth();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var ThemeProviderContext = import_react.createContext({
	theme: "system",
	setTheme: () => {}
});
/** Separate from `theme.tsx` so that file only exports components (Fast Refresh). */
function useTheme() {
	return import_react.useContext(ThemeProviderContext);
}
function getThemeScript(storageKey, defaultTheme) {
	return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${JSON.stringify(defaultTheme)}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	const resolved = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
	root.classList.add(resolved);
	root.style.colorScheme = resolved;
}
function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
	const [theme, setThemeState] = import_react.useState(defaultTheme);
	const [mounted, setMounted] = import_react.useState(false);
	import_react.useEffect(() => {
		const stored = localStorage.getItem(storageKey);
		setThemeState(stored === "light" || stored === "dark" || stored === "system" ? stored : defaultTheme);
		setMounted(true);
	}, [defaultTheme, storageKey]);
	import_react.useEffect(() => {
		if (!mounted) return;
		applyTheme(theme);
	}, [theme, mounted]);
	import_react.useEffect(() => {
		if (!mounted || theme !== "system") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme, mounted]);
	const setTheme = import_react.useCallback((next) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
	}, [storageKey]);
	const value = import_react.useMemo(() => ({
		theme,
		setTheme
	}), [theme, setTheme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProviderContext, {
		value,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: getThemeScript(storageKey, defaultTheme) }), children]
	});
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CircleCheckIcon, { className: "size-4" }),
			info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.InfoIcon, { className: "size-4" }),
			warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.TriangleAlertIcon, { className: "size-4" }),
			error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.OctagonXIcon, { className: "size-4" }),
			loading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2Icon, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		toastOptions: { classNames: { toast: "cn-toast" } },
		...props
	});
};
function TooltipProvider({ delay = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider$1, {
		"data-slot": "tooltip-provider",
		delay,
		...props
	});
}
var site = {
	name: "Wallet Tracker",
	tagline: "Track income, expenses, budgets, and savings in one calm, beautiful financial dashboard.",
	nav: [
		{
			label: "Dashboard",
			to: "/dashboard"
		},
		{
			label: "Income",
			to: "/income"
		},
		{
			label: "Expenses",
			to: "/expenses"
		},
		{
			label: "Transactions",
			to: "/transactions"
		},
		{
			label: "Analytics",
			to: "/analytics"
		},
		{
			label: "Tasks",
			to: "/tasks"
		},
		{
			label: "Budgets",
			to: "/budgets"
		},
		{
			label: "Recurring",
			to: "/recurring"
		},
		{
			label: "Settings",
			to: "/settings"
		}
	]
};
var src_default = "/assets/index-DPbYoMFR.css";
var FONTS_HREF = "https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&display=swap";
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			},
			{ title: site.name },
			{
				name: "description",
				content: site.tagline
			},
			{
				name: "theme-color",
				content: "#0a1411"
			},
			{
				name: "theme-color",
				content: "#0a1411"
			},
			{
				name: "theme-color",
				content: "#0a1411"
			}
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: FONTS_HREF
			},
			{
				rel: "stylesheet",
				href: src_default
			}
		]
	}),
	errorComponent: RootRouteError,
	notFoundComponent: NotFound,
	component: RootComponent,
	shellComponent: RootDocument
});
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}), children] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootRouteError(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, { ...props })
	});
}
function NotFound() {
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		console.error("404 route:", location.pathname);
	}, [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "robots",
			content: "noindex"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-6xl font-bold text-muted-foreground",
						children: "404"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "Page Not Found"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg text-muted-foreground max-w-md mx-auto",
					children: "This page does not exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: buttonVariants(),
						children: "Return to Home"
					})
				})
			]
		})]
	});
}
var $$splitComponentImporter$17 = () => import("./routes-Cl0PHNZf.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: `${site.name} · Personal finance, beautifully organised` },
		{
			name: "description",
			content: site.tagline
		},
		{
			property: "og:title",
			content: site.name
		},
		{
			property: "og:description",
			content: site.tagline
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_app-CUbcfTfK.mjs");
var Route$16 = createFileRoute("/_app")({
	head: () => ({ meta: [{
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./budgets-Bii5GB-4.mjs");
var Route$15 = createFileRoute("/_app/budgets")({
	head: () => ({ meta: [{ title: "Budgets · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./dashboard-B-Ys_jUI.mjs");
var Route$14 = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./expenses-BiwbBxdx.mjs");
var Route$13 = createFileRoute("/_app/expenses")({
	head: () => ({ meta: [{ title: "Expenses · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./income-B2xnIvkz.mjs");
var Route$12 = createFileRoute("/_app/income")({
	head: () => ({ meta: [{ title: "Income · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./profile-Bz6f27dh.mjs");
var Route$11 = createFileRoute("/_app/profile")({
	head: () => ({ meta: [{ title: "Profile · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
/** Resize to a small square JPEG so it fits comfortably in browser storage. */
/** Amount entered as text and validated into integer paise. */
var amountField = string().trim().min(1, "Enter an amount").refine((v) => parseAmountToMinor(v) !== null, "Enter a valid amount greater than 0 (max 2 decimals)");
var dayField = string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date");
var paymentMethodField = _enum([
	"cash",
	"upi",
	"debit_card",
	"credit_card",
	"bank_transfer",
	"wallet",
	"cheque",
	"other"
]);
var txFormSchema = object({
	title: string().trim().min(1, "Enter a title").max(80, "Keep it under 80 characters"),
	amount: amountField,
	categoryId: string().min(1, "Choose a category"),
	date: dayField,
	paymentMethod: paymentMethodField,
	description: string().max(500, "Keep it under 500 characters")
});
var $$splitComponentImporter$10 = () => import("./recurring-BDXc-Fks.mjs");
var Route$10 = createFileRoute("/_app/recurring")({
	head: () => ({ meta: [{ title: "Recurring · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
object({
	type: _enum(["income", "expense"]),
	title: string().trim().min(1, "Enter a title").max(80),
	amount: amountField,
	categoryId: string().min(1, "Choose a category"),
	paymentMethod: paymentMethodField,
	frequency: _enum([
		"daily",
		"weekly",
		"monthly",
		"yearly"
	]),
	startDate: dayField,
	description: string().max(500)
});
var $$splitComponentImporter$9 = () => import("./settings-BIY3MI3G.mjs");
var Route$9 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: "Settings · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./tasks-BFxRR1J8.mjs");
var Route$8 = createFileRoute("/_app/tasks")({
	head: () => ({ meta: [{ title: "Tasks · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./transactions-BmUUnfRs.mjs");
var Route$7 = createFileRoute("/_app/transactions")({
	head: () => ({ meta: [{ title: "Transactions · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./callback-C2giLtNt.mjs");
var Route$6 = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./change-password-zVpCsswx.mjs");
var Route$5 = createFileRoute("/auth/change-password")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./forgot-password-DgJx7snQ.mjs");
var Route$4 = createFileRoute("/auth/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./reset-password-BswPMU-_.mjs");
var Route$3 = createFileRoute("/auth/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sign-in-Cb0zlr1c.mjs");
var Route$2 = createFileRoute("/auth/sign-in")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./verify-email-BDKXMwvL.mjs");
var Route$1 = createFileRoute("/auth/verify-email")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./analytics-BAUZVjQe.mjs");
var Route = createFileRoute("/_app/analytics/")({
	head: () => ({ meta: [{ title: "Analytics · Wallet Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AppRoute = Route$16.update({
	id: "/_app",
	getParentRoute: () => Route$18
});
var AppBudgetsRoute = Route$15.update({
	id: "/budgets",
	path: "/budgets",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$14.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppExpensesRoute = Route$13.update({
	id: "/expenses",
	path: "/expenses",
	getParentRoute: () => AppRoute
});
var AppIncomeRoute = Route$12.update({
	id: "/income",
	path: "/income",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$11.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppRecurringRoute = Route$10.update({
	id: "/recurring",
	path: "/recurring",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppTasksRoute = Route$8.update({
	id: "/tasks",
	path: "/tasks",
	getParentRoute: () => AppRoute
});
var AppTransactionsRoute = Route$7.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => AppRoute
});
var AuthCallbackRoute = Route$6.update({
	id: "/auth/callback",
	path: "/auth/callback",
	getParentRoute: () => Route$18
});
var AuthChangePasswordRoute = Route$5.update({
	id: "/auth/change-password",
	path: "/auth/change-password",
	getParentRoute: () => Route$18
});
var AuthForgotPasswordRoute = Route$4.update({
	id: "/auth/forgot-password",
	path: "/auth/forgot-password",
	getParentRoute: () => Route$18
});
var AuthResetPasswordRoute = Route$3.update({
	id: "/auth/reset-password",
	path: "/auth/reset-password",
	getParentRoute: () => Route$18
});
var AuthSignInRoute = Route$2.update({
	id: "/auth/sign-in",
	path: "/auth/sign-in",
	getParentRoute: () => Route$18
});
var AuthVerifyEmailRoute = Route$1.update({
	id: "/auth/verify-email",
	path: "/auth/verify-email",
	getParentRoute: () => Route$18
});
var AppRouteChildren = {
	AppBudgetsRoute,
	AppDashboardRoute,
	AppExpensesRoute,
	AppIncomeRoute,
	AppProfileRoute,
	AppRecurringRoute,
	AppSettingsRoute,
	AppTasksRoute,
	AppTransactionsRoute,
	AppAnalyticsIndexRoute: Route.update({
		id: "/analytics/",
		path: "/analytics/",
		getParentRoute: () => AppRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuthCallbackRoute,
	AuthChangePasswordRoute,
	AuthForgotPasswordRoute,
	AuthResetPasswordRoute,
	AuthSignInRoute,
	AuthVerifyEmailRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e4,
		retry: 1,
		refetchOnWindowFocus: false
	} } });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: RouteError
	});
}
export { Button$1, CURRENCIES, Route$1, Route$3, amountField, apiHref, apiRequest, cn, dayField, formatMoney, minorToInput, parseAmountToMinor, paymentMethodField, refreshAuth, router_exports, signOut, site, txFormSchema, useAuthStore, useTheme };
