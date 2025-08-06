import { UserOutlined } from '@ant-design/icons';
import { ROUTES } from '@app/routes';
import { LogoIcon } from '@shared/ui/icons';
import { Avatar, Button, Space, Tooltip } from 'antd';

import { useEffect, useState } from 'react';

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

const ADMIN_NAV_ITEMS = [
  { label: 'Пассажиры', path: ROUTES.TABLE_PASSENGERS },
  { label: 'Самолёты', path: ROUTES.TABLE_AIRCRAFTS },
  { label: 'Места', path: ROUTES.TABLE_SEATS },
  { label: 'Пояса', path: ROUTES.TABLE_TIMEZONES },
  { label: 'Рейсы', path: ROUTES.TABLE_FLIGHTS },
  { label: 'Билеты', path: ROUTES.TABLE_TICKETS },
  { label: 'Бронирование', path: ROUTES.TABLE_BOOKINGS },
  { label: 'Посадочные места', path: ROUTES.TABLE_BOARDING },
  { label: 'Пользователи', path: ROUTES.TABLE_USERS },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('token'));
  }, [location]);

  const isAdminRoute = location.pathname.includes('/admin');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuth(false);
    navigate(ROUTES.HOME);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <LogoIcon size={50} />
        <span className={styles['logo-text']}>Air Alien</span>
      </div>

      {isAdminRoute && (
        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            {ADMIN_NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.header__navItem}>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <Space wrap size={16} align="center">
        {isAuth ? (
          <>
            <Tooltip title="Профиль">
              <Space>
                <span>User</span>
                <Avatar size={40} icon={<UserOutlined />} />
              </Space>
            </Tooltip>
            <Button onClick={handleLogout}>Выйти</Button>
          </>
        ) : (
          <>
            <Link to={ROUTES.SIGN_IN} className={styles['btn-nav']}>
              Вход
            </Link>
            <Link to={ROUTES.SIGN_UP} className={styles['btn-nav']}>
              Регистрация
            </Link>
          </>
        )}
      </Space>
    </header>
  );
};
