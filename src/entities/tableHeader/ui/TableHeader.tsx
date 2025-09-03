import { type ReactNode, memo } from 'react';

import styles from './TableHeader.module.scss';

interface ITableHeader {
  title: string;
  extraContent?: ReactNode;
  className?: string;
  btnName: string;
  onBtnClick: () => void;
  btnIcon?: ReactNode;
  titleClassName?: string;
}

export const TableHeader = memo(
  ({
    title = '',
    extraContent,
    className = '',
    titleClassName = '',
  }: ITableHeader) => {
    return (
      <div className={`${styles.header} ${className}`}>
        <div className={styles.header__content}>
          <h1 className={`${styles.header__title} ${titleClassName}`}>{title}</h1>
        </div>

        {extraContent && (
          <div className={styles['header__btn--wrapper']}>
            {extraContent}
          </div>
        )}
      </div>
    );
  },
);
