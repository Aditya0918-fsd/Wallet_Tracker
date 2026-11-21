import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { useRenderElement } from "./@base-ui/react+[2...].mjs";
import { useDialogRootContext, useRenderDialogRoot } from "./@base-ui/react+[3...].mjs";
import { useBaseUiId } from "./base-ui__react+base-ui__utils.mjs";
/**
* A paragraph with additional information about the dialog.
* Renders a `<p>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogDescription = /*#__PURE__*/ (/* @__PURE__ */ __toESM(require_react(), 1)).forwardRef(function DialogDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const store = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("descriptionElementId", id);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/alert-dialog/root/AlertDialogRoot.mjs
/**
* Groups all parts of the alert dialog.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
*/
function AlertDialogRoot(props) {
	return useRenderDialogRoot("alert-dialog", props);
}
export { AlertDialogRoot, DialogDescription };
