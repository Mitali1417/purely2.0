import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import AllRoutes from "./routes/AllRoutes";
import RootLayout from "./layouts/RootLayout";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { useCartSync } from "./hooks/useCartSync";
import ScrollToTop from "./components/shared/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppContent = () => {
  useCartSync();

  return (
    <div>
      <Router>
        <ScrollToTop />
        <RootLayout>
          <AllRoutes />
        </RootLayout>
      </Router>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
