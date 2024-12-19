import { RouterProvider } from 'react-router-dom';
import { router } from '@/infrastructure/routing/Router';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
