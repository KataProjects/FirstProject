import { Table, type TablePaginationConfig, type TableProps } from 'antd';

import styles from './Table.module.scss';

export const MyTable = <T extends { id?: number | string } = any>({
  dataSource = [],
  pagination,
  ...props
}: TableProps<T> & { pagination?: TablePaginationConfig }) => {

  const data = dataSource?.map((item) => ({
    ...item,
    key: item.id?.toString() || Math.random().toString(),
  }));

  const { onChange, ...restPagination } = pagination || {};

  const handlePageChange = (...args: Parameters<NonNullable<typeof onChange>>) => {
    if (onChange) {
      onChange(...args);
    }
  };

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
          ...restPagination,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};