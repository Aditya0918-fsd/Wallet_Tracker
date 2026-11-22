import { __toESM } from "../_runtime.mjs";
import { Logo } from "./logo-Dg5jme04.mjs";
import { Button$1, cn, site } from "./router-CV1frvwC.mjs";
import { useWallet } from "./card-DMJBVK8X.mjs";
import { DialogBackdrop, DialogClose, DialogPopup, DialogPortal, DialogTitle } from "../_libs/@base-ui/react+[3...].mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, clearNotifications, markAllRead, markNotificationRead } from "./dropdown-menu-2jleO2R6.mjs";
import { ThemeToggle } from "./theme-toggle-GO1Ueh-U.mjs";
import { useAuth } from "./use-auth-DYBDWyDu.mjs";
import { useTxDialog } from "./use-tx-dialog-BkFXropk.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useLocation } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { formatDistanceToNow } from "../_libs/date-fns2.mjs";
import { parseISO } from "../_libs/date-fns.mjs";
import { AvatarFallback as AvatarFallback$1, AvatarImage as AvatarImage$1, AvatarRoot, PopoverPopup, PopoverPortal, PopoverPositioner, PopoverRoot, PopoverTrigger as PopoverTrigger$1, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "../_libs/base-ui__react.mjs";
import { DialogRoot } from "../_libs/base-ui__react3.mjs";
// node_modules/.nitro/vite/services/ssr/assets/app-shell-I3wLl66O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function Popover$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRoot, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger$1, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPopup, {
			"data-slot": "popover-content",
			className: cn("z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
function ScrollArea$1({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollAreaRoot, {
		"data-slot": "scroll-area",
		className: cn("relative", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaViewport, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaCorner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": orientation,
		orientation,
		className: cn("flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
var KIND_ICON = {
	transaction: {
		icon: import_lucide_react.CircleDollarSign,
		tone: "bg-primary/10 text-primary"
	},
	budget_warning: {
		icon: import_lucide_react.AlertTriangle,
		tone: "bg-chart-4/20 text-foreground"
	},
	budget_exceeded: {
		icon: import_lucide_react.OctagonAlert,
		tone: "bg-destructive/10 text-destructive"
	},
	recurring: {
		icon: import_lucide_react.CalendarClock,
		tone: "bg-chart-3/15 text-chart-3"
	},
	task_overdue: {
		icon: import_lucide_react.ClipboardList,
		tone: "bg-destructive/10 text-destructive"
	},
	monthly_summary: {
		icon: import_lucide_react.FileBarChart,
		tone: "bg-accent text-accent-foreground"
	}
};
function NotificationBell() {
	const { data, update } = useWallet();
	const items = data.notifications.filter((n) => n.title);
	const unread = items.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "ghost",
			size: "icon",
			className: "relative",
			"aria-label": `Notifications, ${unread} unread`
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bell, {}), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-0.5 -right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-destructive px-1 font-mono text-[10px] font-semibold text-white",
			children: unread > 9 ? "9+" : unread
		}) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-[min(92vw,380px)] gap-0 p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display font-semibold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [unread, " unread"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "xs",
					variant: "ghost",
					disabled: unread === 0,
					onClick: () => update(markAllRead),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CheckCheck, {}), " Read all"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "xs",
					variant: "ghost",
					disabled: items.length === 0,
					onClick: () => update(clearNotifications),
					children: "Clear"
				})]
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid place-items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bell, { className: "size-6" }), "You're all caught up."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
			className: "max-h-[420px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y",
				children: items.slice(0, 40).map((n) => {
					const meta = KIND_ICON[n.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => update((d) => markNotificationRead(d, n.id)),
						className: cn("flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60", !n.read && "bg-primary/[0.04]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-8 shrink-0 place-items-center rounded-lg", meta.tone),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.icon, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-medium",
										children: n.title
									}), !n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-primary" }) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2 text-xs text-muted-foreground",
									children: n.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground/80",
									children: formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })
								})
							]
						})]
					}) }, n.id);
				})
			})
		})]
	})] });
}
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "sheet-content",
		"data-side": side,
		className: cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-4 right-4",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.XIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-1.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "sheet-title",
		className: cn("font-medium text-foreground", className),
		...props
	});
}
var ICONS = {
	"/dashboard": import_lucide_react.LayoutDashboard,
	"/income": import_lucide_react.ArrowDownCircle,
	"/expenses": import_lucide_react.ArrowUpCircle,
	"/transactions": import_lucide_react.ArrowLeftRight,
	"/analytics": import_lucide_react.BarChart3,
	"/tasks": import_lucide_react.CheckSquare,
	"/budgets": import_lucide_react.PiggyBank,
	"/recurring": import_lucide_react.Repeat,
	"/settings": import_lucide_react.Settings
};
var NAV_ITEMS = site.nav.map((n) => ({
	...n,
	icon: ICONS[n.to] ?? import_lucide_react.LayoutDashboard
}));
/** Shown in the mobile bottom bar; the rest live under "More". */
var MOBILE_PRIMARY = [
	"/dashboard",
	"/transactions",
	"/analytics",
	"/budgets"
];
function initials(name) {
	return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "W";
}
function UserAvatar({ className }) {
	const { data } = useWallet();
	const { user } = useAuth();
	const src = data.profile.avatar ?? void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
		className,
		children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
			src,
			alt: data.profile.name
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "bg-primary/15 font-semibold text-primary",
			children: initials(data.profile.name)
		})]
	});
}
function SidebarNav({ onNavigate }) {
	const { pathname } = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV_ITEMS.map((item) => {
			const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-4.5", active ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground") }),
					item.label,
					active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto size-1.5 rounded-full bg-sidebar-primary" }) : null
				]
			}, item.to);
		})
	});
}
function AccountMenu() {
	const { data, email } = useWallet();
	const { signOut } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "ghost",
			className: "h-10 gap-2 rounded-full px-1.5 sm:pr-3",
			"aria-label": "Account menu"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden max-w-32 truncate text-sm font-medium sm:inline",
			children: data.profile.name
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
				className: "flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-sm font-semibold text-foreground",
					children: data.profile.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-xs font-normal",
					children: email
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/profile" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.User, {}), " Profile"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/settings" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, {}), " Settings"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				onClick: () => void signOut({ returnTo: "/" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, {}), " Log out"]
			})
		]
	})] });
}
function QuickAdd() {
	const { openNew, openTask } = useTxDialog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			size: "sm",
			className: "gap-1.5"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: "New"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-44",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: () => openNew("income"),
				children: "Add income"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: () => openNew("expense"),
				children: "Add expense"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: openTask,
				children: "Add task"
			})
		]
	})] });
}
function AppShell({ children }) {
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const { pathname } = useLocation();
	const current = NAV_ITEMS.find((n) => pathname.startsWith(n.to));
	const primary = NAV_ITEMS.filter((n) => MOBILE_PRIMARY.includes(n.to));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 pt-1 pb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { light: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto rounded-2xl bg-sidebar-accent p-4 text-xs text-sidebar-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold text-sidebar-accent-foreground",
							children: "Private by design"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-1",
							children: "Your records stay in this browser, tied to your account."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur-md sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "hidden font-display text-lg font-semibold lg:block",
							children: current?.label ?? "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAdd, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenu, {})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-[1400px] flex-1 px-4 pt-6 pb-28 sm:px-6 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 flex justify-around border-t bg-background/95 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur-md lg:hidden",
				children: [primary.map((item) => {
					const active = pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-w-14 cursor-pointer flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMoreOpen(true),
					className: "flex min-w-14 cursor-pointer flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreHorizontal, { className: "size-5" }), "More"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: moreOpen,
				onOpenChange: setMoreOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 bg-sidebar p-4 text-sidebar-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
						className: "px-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "text-sidebar-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { light: true })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, { onNavigate: () => setMoreOpen(false) })]
				})
			})
		]
	});
}
export { AppShell, UserAvatar };
