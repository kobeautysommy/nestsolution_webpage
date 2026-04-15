import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEOHead } from './components/SEOHead';
import { Home } from './pages/Home';
import { Pain } from './pages/Pain';
import { Services } from './pages/Services';
import { Process } from './pages/Process';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cases } from './pages/Cases';

function Root() {
  const { pathname } = useLocation();
  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#080f1e' }}>
      <SEOHead />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eef1f6', fontFamily: "'Noto Sans KR', sans-serif", flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '6rem', color: 'rgba(0,200,170,0.3)', lineHeight: 1 }}>404</div>
      <p style={{ color: '#7a8799' }}>페이지를 찾을 수 없습니다.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,         Component: Home },
      { path: 'pain',        Component: Pain },
      { path: 'services',    Component: Services },
      { path: 'process',     Component: Process },
      { path: 'about',       Component: About },
      { path: 'contact',     Component: Contact },
      { path: 'cases',       Component: Cases },
      { path: '*',           Component: NotFound },
    ],
  },
]);
