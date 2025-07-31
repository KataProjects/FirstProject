import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import type { IColumnTableAntd, IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { useGetAircraftListQuery } from '@features/tableAircraft/models/aircraftApi.ts';
import styles from './TableAircraft.module.scss';

const DragHandle = () => <Button type="text" size="small" icon={<HolderOutlined />} />;


export const TableAircraft = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const {
    data: aircraftList,
    isLoading,
    isError,
  } = useGetAircraftListQuery ({ page, size });

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

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
      key: 'sort',
      title: '',
      width: 50,
      align: 'center',
      render: () => <DragHandle />,
    },
  ];

  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Самолёты"
        btnName="Добавить самолеты"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentAircraftTable>
        dataSource={aircraftList?.content || []}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: aircraftList? aircraftList.number + 1: 1,
          pageSize: aircraftList?.size || size,
          total: aircraftList?.totalElements || 0,
          onChange: (pageNum) => setPage(pageNum - 1),
        }}
      />
    </div>
  );
};
