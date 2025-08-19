import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);
