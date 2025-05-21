import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { GroceryProvider } from '@/context/GroceryProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage, ProductPage } from '@/pages';

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
    </Route>,
  ),
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GroceryProvider>
        <RouterProvider router={router} />
      </GroceryProvider>
    </QueryClientProvider>
  );
}

export default App;
