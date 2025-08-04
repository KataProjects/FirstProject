<<<<<<< HEAD
import { Table, type TablePaginationConfig, type TableProps } from 'antd';
=======
import { Table, type TableProps, type TablePaginationConfig } from 'antd';
>>>>>>> dev

import styles from './Table.module.scss';

export const MyTable = <T extends { id?: number | string } = any>({
  dataSource = [],
  pagination,
  ...props
}: TableProps<T>) => {
  const data = dataSource?.map((item) => ({
    ...item,
    key: item.id?.toString() || Math.random().toString(),
  }));

<<<<<<< HEAD
  const mergedPagination: TablePaginationConfig = {
    position: ['bottomLeft'],
    showSizeChanger: false,
    ...pagination,
  };
=======
const mergedPagination:TablePaginationConfig = {
  position: ['bottomLeft'],   
  showSizeChanger: false,    
  ...pagination              
};
>>>>>>> dev

  return (
    <div className={styles.tableWrapper}>
      <Table<T>
        {...props}
        dataSource={data}
        className={styles.customTable}
        bordered
        pagination={mergedPagination}
      />
    </div>
  );
};
