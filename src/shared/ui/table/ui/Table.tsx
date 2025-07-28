import { Table, type TableProps } from 'antd';

import styles from './Table.module.scss';

<<<<<<< HEAD
export const MyTable = <T extends object = any>({
  pagination = { position: ['bottomLeft'], showSizeChanger: true },
=======
export const MyTable = <T extends { id?: number | string } = any>({
  dataSource = [],
>>>>>>> dev
  ...props
}: TableProps<T>) => {
  const data = dataSource?.map((item) => ({
    ...item,
    key: item.id?.toString() || Math.random().toString(),
  }));

  return (
    <div className={styles.tableWrapper}>
      <Table<T>
        {...props}
        dataSource={data}
        className={styles.customTable}
        bordered
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
