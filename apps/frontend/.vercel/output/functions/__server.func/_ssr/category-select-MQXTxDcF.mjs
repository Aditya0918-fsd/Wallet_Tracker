import { __toESM } from "../_runtime.mjs";
import { Button$1, cn } from "./router-BGnyA3VS.mjs";
import { Input$1 } from "./input-Ce8VWSEq.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-CQoS0Rkt.mjs";
import { useWallet } from "./card-CHTOrAKP.mjs";
import { addCategory } from "./dropdown-menu-DJhjwrac.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/category-select-MQXTxDcF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
/** Category dropdown with inline "add custom category". */
function CategorySelect({ type, value, onChange, id, invalid, className }) {
	const { data, update } = useWallet();
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const options = data.categories.filter((c) => c.type === type);
	const save = () => {
		if (!name.trim()) return;
		let createdId = "";
		update((d) => {
			const res = addCategory(d, type, name);
			createdId = res.category.id;
			return res.data;
		});
		onChange(createdId);
		setName("");
		setAdding(false);
	};
	if (adding) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex gap-2", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				autoFocus: true,
				value: name,
				maxLength: 40,
				placeholder: "e.g. Side project",
				onChange: (e) => setName(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						save();
					}
					if (e.key === "Escape") setAdding(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				size: "sm",
				onClick: save,
				className: "h-9",
				children: "Add"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				size: "sm",
				variant: "ghost",
				className: "h-9",
				onClick: () => setAdding(false),
				children: "Cancel"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
			id,
			"aria-invalid": invalid,
			className: "w-full",
			value,
			onChange: (e) => onChange(e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
				value: "",
				disabled: true,
				children: "Select a category"
			}), options.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
				value: c.id,
				children: c.name
			}, c.id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			type: "button",
			size: "icon",
			variant: "secondary",
			className: "size-9 shrink-0",
			"aria-label": "Add custom category",
			onClick: () => setAdding(true),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {})
		})]
	});
}
export { CategorySelect };
