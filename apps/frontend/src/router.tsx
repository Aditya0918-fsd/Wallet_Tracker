import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import RouteError from "@/components/route-error.tsx";
import { routeTree, type FileRouteTypes } from "./routeTree.gen.ts";

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false } },
  });
  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: RouteError,
  });
}
declare module "@tanstack/react-router" {
  interface Register { router: ReturnType<typeof getRouter>; }
}
export type RoutePath = Exclude<FileRouteTypes["to"], `${string}$${string}`>;
