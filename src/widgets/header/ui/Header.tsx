import { UserOutlined } from '@ant-design/icons';
import { LogoIcon } from '@shared/ui/icons';
import { Avatar, Space } from 'antd';

import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { ROUTES } from '@app/routes';

const navItems = [
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
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <LogoIcon size={50} />
        <span className={styles['logo-text']}>Air Alien</span>
      </div>

      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          {navItems.map((item) => (
            <li key={item.label} className={styles.header__navItem}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={item.path}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Space wrap size={16}>
        <span>UserName</span>
        <Avatar size={40} icon={<UserOutlined />} />
      </Space>
    </header>
  );
};
