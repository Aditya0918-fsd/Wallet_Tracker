import { __toESM } from "../_runtime.mjs";
import { UserAvatar } from "./app-shell-BssJ5xO0.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { Button$1 } from "./router-BGnyA3VS.mjs";
import { Input$1 } from "./input-Ce8VWSEq.mjs";
import { Label } from "./label-C09qvLPy.mjs";
import { Textarea } from "./textarea-C44HdP89.mjs";
import { Panel } from "./panel-d5fe1IY9.mjs";
import { useWallet } from "./card-CHTOrAKP.mjs";
import { updateProfile } from "./dropdown-menu-DJhjwrac.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/profile-C3DGSMEl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
/** Resize to a small square JPEG so it fits comfortably in browser storage. */
async function resizeImage(file, size = 256) {
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable");
	const s = Math.min(bitmap.width, bitmap.height);
	ctx.drawImage(bitmap, (bitmap.width - s) / 2, (bitmap.height - s) / 2, s, s, 0, 0, size, size);
	return canvas.toDataURL("image/jpeg", .85);
}
function ProfilePage() {
	const { data, update, email } = useWallet();
	const [name, setName] = (0, import_react.useState)(data.profile.name);
	const [age, setAge] = (0, import_react.useState)(data.profile.age?.toString() ?? "");
	const [bio, setBio] = (0, import_react.useState)(data.profile.bio);
	const [error, setError] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const save = (e) => {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return setError("Enter your name");
		const ageNum = age.trim() === "" ? null : Number(age);
		if (ageNum !== null && (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120)) return setError("Age must be a whole number between 1 and 120");
		setError(null);
		update((d) => updateProfile(d, {
			name: trimmed,
			age: ageNum,
			bio: bio.trim()
		}));
		toast.success("Profile saved");
	};
	const onFile = async (file) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
		if (file.size > 8388608) return toast.error("Image must be under 8 MB");
		try {
			const avatar = await resizeImage(file);
			update((d) => updateProfile(d, { avatar }));
			toast.success("Profile picture updated");
		} catch {
			toast.error("Could not read that image");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Profile"
				}),
				description: "How you appear in Wallet Tracker."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Your details",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: save,
					className: "grid gap-6",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-4 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, { className: "size-24 text-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-center gap-2 sm:justify-start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => fileRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Camera, {}), " Change photo"]
									}),
									data.profile.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => update((d) => updateProfile(d, { avatar: null })),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Remove"]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => void onFile(e.target.files?.[0])
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-[1fr_140px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "name",
									value: name,
									maxLength: 60,
									onChange: (e) => setName(e.target.value),
									placeholder: "Priya Sharma"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "age",
									children: "Age"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "age",
									inputMode: "numeric",
									value: age,
									onChange: (e) => setAge(e.target.value.replace(/\D/g, "")),
									placeholder: "28"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Mail, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: "email",
										value: email,
										readOnly: true,
										disabled: true,
										className: "pl-9"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "From your signed-in account."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bio",
									children: "Bio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "bio",
									rows: 3,
									maxLength: 300,
									value: bio,
									onChange: (e) => setBio(e.target.value),
									placeholder: "Saving for a trip to Japan."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-right text-xs text-muted-foreground",
									children: [bio.length, "/300"]
								})
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								children: "Save profile"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Password and sign-in",
				description: "Managed by Wallet Tracker account security.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.KeyRound, { className: "mt-0.5 size-4 shrink-0" }), "Signed in with email and password? Use \"Forgot password\" on the sign-in screen to reset or change it."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						size: "sm",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth/sign-in" }),
						nativeButton: false,
						children: "Open sign-in"
					})]
				})
			})
		]
	});
}
export { ProfilePage as component };
