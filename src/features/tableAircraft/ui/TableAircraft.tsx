import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import type { IContentAircraftTable, IColumnTableAntd } from '@shared/types';
import { ContextMenu, useContextMenu } from '@shared/ui/contexMenu';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import { Table } from '@shared/ui/table';
import { MoreHorizontal, Pencil, X } from 'lucide-react';
import { Button, Spin, type TablePaginationConfig } from 'antd';
import { type FC, useCallback, useEffect, useState } from 'react';
import { useGetAircraftListQuery } from '@features/tableAircraft/models/aircraftApi.ts';
import styles from './TableAircraft.module.scss';


export const TableAircraft: FC = () => {
  const [page, setPage] = useState(0);
  const { contextData, open, close } = useContextMenu<IContentAircraftTable>();


  const { data: aircraftList, isSuccess, isLoading, isError } = useGetAircraftListQuery({
    page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(aircraftList);
    }
  }, [aircraftList, isSuccess]);

  const columns: Array<IColumnTableAntd<IContentAircraftTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Номер',
      dataIndex: 'aircraftNumber',
      key: 'aircraftNumber',
    },
    {
      title: 'Год выпуска',
      dataIndex: 'modelYear',
      key: 'modelYear',
    },
    {
      title: 'Дальность полета (км)',
      dataIndex: 'flightRange',
      key: 'flightRange',
    },
    {
      key: 'actions',
      title: '',
      width: 50,
      align: 'center',
      render: (_, row) => (
        <Button type="text" size="small" icon={<HolderOutlined />} onClick={(e) => open(e, row)} />
      ),
    }
  ];

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Ошибка загрузки</div>;

  return isSuccess ? (
    <div className={styles.wrapper}>
      <TableHeader
        title="Самолёты"
        btnName="Добавить самолеты"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentAircraftTable>
        dataSource={aircraftList?.content ?? []}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (aircraftList?.number ?? 0) + 1,
          pageSize: aircraftList?.size,
          total: aircraftList?.totalElements ?? 0,
        }}
      />

      {contextData && (
        <ContextMenu
          x={contextData.x}
          y={contextData.y}
          onClose={close}
          items={[
            {
              label: 'Подробности',
              icon: <MoreHorizontal size={16} />,
              onClick: () => console.log('Подробности', contextData.data),
            },
            {
              label: 'Редактировать',
              icon: <Pencil size={16} />,
              onClick: () => console.log('Редактировать', contextData.data),
            },
            {
              label: 'Удалить',
              icon: <X size={16} />,
              onClick: () => console.log('Удалить', contextData.data),
            },
          ]}
        />
      )}
    </div>
  ) : null;
};