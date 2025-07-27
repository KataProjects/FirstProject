import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

export const Layout = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
