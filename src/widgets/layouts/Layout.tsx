import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);
