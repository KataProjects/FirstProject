import { ROUTES } from '@app/routes';
import { LogoIcon } from '@shared/ui/icons';

import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__list}>
        <li>
          <Link to={ROUTES.ABOUT_US}>О нас</Link>
        </li>
        <li>
          <Link to={ROUTES.PRIVACY_POLICY}>Политика конфиденциальности</Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACT_US}>Свзяаться с нами</Link>
        </li>
      </ul>

      <div className={styles.footer__logo}>
        <LogoIcon />
        <span>Air Alien</span>
      </div>

      {/* <p>&copy; 2025 Aviasales. All rights reserved.</p> */}
    </footer>
  );
};

