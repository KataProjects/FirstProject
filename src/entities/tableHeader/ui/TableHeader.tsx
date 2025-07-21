import { type ReactNode, memo } from 'react';

import styles from './TableHeader.module.scss';

interface ITableHeader {
  title: string;
  btnName?: string;
  onBtnClick?: () => void;
  btnIcon?: ReactNode;
  extraContent?: ReactNode;
  className?: string;
  buttonClassName?: string;
  titleClassName?: string;
}

export const TableHeader = memo(
  ({
    title = '',
    btnName = '',
    onBtnClick,
    btnIcon = <span className={styles.btn__icon}>+</span>,
    extraContent,
    className = '',
    buttonClassName = '',
    titleClassName = '',
  }: ITableHeader) => {
    return (
      <div className={`${styles.header} ${className}`}>
        <div className={styles.header__content}>
          <h1 className={`${styles.header__title} ${titleClassName}`}>{title}</h1>
        </div>

        {btnName && (
          <div className={styles['header__btn--wrapper']}>
            {extraContent}
            <button className={`${styles.header__btn} ${buttonClassName}`} onClick={onBtnClick}>
              {btnName}
              {btnIcon}
            </button>
          </div>
        )}
      </div>
    );
  },
);

// import styles from './TableHeader.module.scss';

// interface ITableHeader {
//   title: string;
//   btnName: string;
// }

// export const TableHeader = ({ title = '', btnName = '' }: ITableHeader) => {
//   return (
//     <div className={styles.header}>
//       <h1 className={styles.header__title}>{title}</h1>
//       <button className={styles.header__btn}>
//         {btnName}
//         <span className={styles.btn__icon}>+</span>
//       </button>
//     </div>
//   );
// };
