import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
<meta name="naver-site-verification" content="930311f2339c80c19127df25b854460858d85e27" />

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors />
    </>
  );
}
