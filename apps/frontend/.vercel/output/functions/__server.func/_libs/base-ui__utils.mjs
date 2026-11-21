import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/useControlled.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(() => defaultProp);
	return [isControlled && controlled !== void 0 ? controlled : valueState, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
export { useControlled };
