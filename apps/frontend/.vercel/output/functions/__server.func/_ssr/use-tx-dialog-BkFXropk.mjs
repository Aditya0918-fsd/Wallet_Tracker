import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/use-tx-dialog-BkFXropk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var TxDialogContext = (0, import_react.createContext)(null);
function useTxDialog() {
	const ctx = (0, import_react.useContext)(TxDialogContext);
	if (!ctx) throw new Error("useTxDialog must be used inside TxDialogProvider");
	return ctx;
}
export { TxDialogContext, useTxDialog };
