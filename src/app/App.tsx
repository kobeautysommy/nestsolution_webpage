import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';

export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <RouterProvider router={router} />
      {mounted && <Toaster position="bottom-center" richColors />}
    </>
  );
}
