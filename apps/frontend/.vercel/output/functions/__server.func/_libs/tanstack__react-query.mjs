import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
// ../../node_modules/.pnpm/@tanstack+react-query@5.107_412b1c1983c52cebcb486b0896765416/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* The context that `useQueryClient` reads from. `QueryClientProvider` is the normal way to set it.
*/
var QueryClientContext = import_react.createContext(void 0);
/**
* The `useQueryClient` hook returns the current `QueryClient` instance.
* @param queryClient - Use this to use a custom `QueryClient`. Otherwise, the one from the nearest context will
* be used.
* @returns The current `QueryClient` instance.
* @throws {Error} If no `queryClient` argument is passed and no `QueryClientProvider` is found in the
* component tree.
*/
var useQueryClient = (queryClient) => {
	const client = import_react.useContext(QueryClientContext);
	if (queryClient) return queryClient;
	if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one");
	return client;
};
/**
* Use the `QueryClientProvider` component to connect and provide a `QueryClient` to your application. Also
* calls `client.mount()`/`client.unmount()` as this component mounts/unmounts, which subscribes the client to
* focus/online events (resuming any paused mutations and refetching as needed when the app regains focus or
* comes back online).
* @param props - The `client` to provide, and the `children` that get access to it.
* @returns The provided `children`, wrapped so they can read the `QueryClient` via `useQueryClient`.
* @example
* ```tsx
* import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
*
* const queryClient = new QueryClient()
*
* function App() {
*   return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
* }
* ```
*/
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
// ../../node_modules/.pnpm/@tanstack+react-query@5.107_412b1c1983c52cebcb486b0896765416/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
/**
* Creates the value shared through the boundary's context, which tracks whether a reset was
* requested.
* @returns The `clearReset`, `isReset`, and `reset` functions of the boundary.
*/
function createValue() {
	let isReset = false;
	return {
		/**
		* Clears the reset state, so queries know not to try again until the boundary is reset again.
		*/
		clearReset: () => {
			isReset = false;
		},
		/**
		* Resets any query errors within the boundary, so queries know they can try again.
		*/
		reset: () => {
			isReset = true;
		},
		/**
		* Returns whether the boundary has been reset and not yet cleared.
		* @returns `true` if the boundary has been reset and not yet cleared.
		*/
		isReset: () => {
			return isReset;
		}
	};
}
var QueryErrorResetBoundaryContext = import_react.createContext(createValue());
/**
* This hook will reset any query errors within the closest `QueryErrorResetBoundary`. If there is no boundary
* defined it will reset them globally.
* @returns The boundary's {@link QueryErrorResetBoundaryValue}.
* @example
* ```tsx
* import { ErrorBoundary } from 'react-error-boundary'
* import { useQueryErrorResetBoundary } from '@tanstack/react-query'
*
* function App({ children }: { children: React.ReactNode }) {
*   const { reset } = useQueryErrorResetBoundary()
*
*   return (
*     <ErrorBoundary
*       onReset={reset}
*       fallbackRender={({ resetErrorBoundary }) => (
*         <div>
*           There was an error!
*           <button onClick={() => resetErrorBoundary()}>Try again</button>
*         </div>
*       )}
*     >
*       {children}
*     </ErrorBoundary>
*   )
* }
* ```
*/
var useQueryErrorResetBoundary = () => import_react.useContext(QueryErrorResetBoundaryContext);
export { QueryClientProvider, useQueryClient, useQueryErrorResetBoundary };
