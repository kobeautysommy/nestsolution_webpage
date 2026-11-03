import { useState, useEffect } from 'react';
import { RouterProvider, type createBrowserRouter } from 'react-router';
import { Toaster } from 'sonner';

export default function App({ router }: { router: ReturnType<typeof createBrowserRouter> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <RouterProvider router={router} />
      {mounted && <Toaster position="bottom-center" richColors />}
    </>
  );
}
