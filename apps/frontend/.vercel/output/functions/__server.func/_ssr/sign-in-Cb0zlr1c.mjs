import { __toESM } from "../_runtime.mjs";
import { Logo } from "./logo-Dg5jme04.mjs";
import { Button$1, apiHref, apiRequest } from "./router-CV1frvwC.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { Label } from "./label-DrwUoeEr.mjs";
import { useAuth } from "./use-auth-DYBDWyDu.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/sign-in-Cb0zlr1c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function SignInPage() {
	const [register, setRegister] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resending, setResending] = (0, import_react.useState)(false);
	const oauthErrorShown = (0, import_react.useRef)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [verifyNeeded, setVerifyNeeded] = (0, import_react.useState)(false);
	const { refresh } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (oauthErrorShown.current) return;
		const params = new URLSearchParams(window.location.search);
		if (params.get("error") === "google-sign-in-failed") {
			oauthErrorShown.current = true;
			toast.error("Google sign-in could not be completed. If you already have an account, sign in to it first.");
			params.delete("error");
			window.history.replaceState(null, "", window.location.pathname + (params.size ? "?" + params.toString() : ""));
		}
	}, []);
	async function submit(event) {
		event.preventDefault();
		setBusy(true);
		setVerifyNeeded(false);
		try {
			const response = await apiRequest(register ? "/auth/register" : "/auth/login", {
				method: "POST",
				body: JSON.stringify(register ? {
					name,
					email,
					password
				} : {
					email,
					password
				})
			});
			if (register) {
				toast.success("Account created", { description: response.message || "Check your email to verify the account." });
				setRegister(false);
				setPassword("");
			} else {
				await refresh();
				toast.success("Welcome back");
				await navigate({ to: "/dashboard" });
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unable to sign in.";
			if (message.toLowerCase().includes("verify your email")) setVerifyNeeded(true);
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	async function resend() {
		setResending(true);
		try {
			const response = await apiRequest("/auth/resend-verification", {
				method: "POST",
				body: JSON.stringify({ email })
			});
			toast.success(response.message);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not resend verification.");
		} finally {
			setResending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "size-4" }), "Back to Wallet Tracker"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-7 shadow-sm sm:p-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-7 flex flex-col items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-semibold",
								children: register ? "Create your account" : "Welcome back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: register ? "Start keeping your finances in one place." : "Sign in to access your private wallet."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void submit(e),
						className: "space-y-4",
						children: [
							register && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.UserRound, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: "name",
										required: true,
										minLength: 1,
										maxLength: 80,
										autoComplete: "name",
										className: "pl-9",
										value: name,
										onChange: (e) => setName(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Mail, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: "email",
										type: "email",
										required: true,
										autoComplete: "email",
										className: "pl-9",
										value: email,
										onChange: (e) => setEmail(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LockKeyhole, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "password",
											type: "password",
											required: true,
											minLength: 10,
											maxLength: 128,
											autoComplete: register ? "new-password" : "current-password",
											className: "pl-9",
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									}),
									register && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Use at least 10 characters."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								className: "w-full",
								type: "submit",
								disabled: busy,
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2, { className: "size-4 animate-spin" }), register ? "Create account" : "Sign in"]
							})
						]
					}),
					verifyNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						className: "mt-3 w-full",
						disabled: !email || resending,
						onClick: () => void resend(),
						children: resending ? "Sending…" : "Resend verification email"
					}),
					!register && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-primary hover:underline",
							to: "/auth/forgot-password",
							children: "Forgot your password?"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative my-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex justify-center text-xs uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-card px-2 text-muted-foreground",
								children: "or"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						className: "w-full",
						onClick: () => window.location.assign(apiHref("/auth/google")),
						children: "Continue with Google"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-2 text-center text-xs text-muted-foreground",
						children: "Google sign-in requires OAuth credentials in the server environment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-center text-sm text-muted-foreground",
						children: [
							register ? "Already have an account?" : "New to Wallet Tracker?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "font-medium text-primary underline-offset-4 hover:underline",
								onClick: () => setRegister((v) => !v),
								children: register ? "Sign in" : "Create account"
							})
						]
					})
				]
			})]
		})
	});
}
export { SignInPage as component };
