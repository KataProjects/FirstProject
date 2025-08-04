import React from 'react';

import styles from './contextMenu.module.scss';

type ContextMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

type Props = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export const ContextMenu: React.FC<Props> = ({ x, y, items, onClose }) => {
  return (
    <div className={styles.menuWrapper} style={{ top: y, left: x }} onMouseLeave={onClose}>
      <div className={styles.menu}>
        <div className={styles.menuArrow}></div>

        <div className={styles.menuList}>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className={`${styles.menuItem} ${item.active ? styles.menuItemActive : ''}`}
              type='button'
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
