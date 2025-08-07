import { Table, type TableProps, type TablePaginationConfig } from 'antd';

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

const mergedPagination:TablePaginationConfig = {
  position: ['bottomLeft'],   
  showSizeChanger: false,    
  ...pagination              
};

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
