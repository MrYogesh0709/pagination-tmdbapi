import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { loader as HomeLoader } from "./Home";
import SingleMovie from "./SingleMovie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: HomeLoader(queryClient),
    },
    {
      path: "movie/:id",
      element: <SingleMovie />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
