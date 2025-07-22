import { Table, type TableProps } from 'antd';

import styles from './Table.module.scss';

export const MyTable = <T extends object = any>({
  pagination = { position: ['bottomLeft'], showSizeChanger: false },
  ...props
}: TableProps<T>) => {
  return (
    <div className={styles.tableWrapper}>
      <Table<T> {...props} className={styles.customTable} pagination={pagination} />
    </div>
  );
};
