
import { BrowserRouter as Router } from "react-router-dom"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AllRoutes from "./routes/AllRoutes";
import { styles } from "./style/tailwindStyles";

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
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${styles.boxWidth}`}>
        <Router>
          <AllRoutes />
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
