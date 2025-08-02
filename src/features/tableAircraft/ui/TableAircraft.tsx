import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentAircraftTable } from '@shared/types';
import { ContextMenu, useContextMenu } from '@shared/ui/contexMenu';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';
import { MoreHorizontal, Pencil, X } from 'lucide-react';

import { useCallback } from 'react';

import { aircraftMock } from '../models/aircraft.mock';
import styles from './TableAircraft.module.scss';

export const TableAircraft = () => {
  const { contextData, open, close } = useContextMenu<IContentAircraftTable>();

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
      key: 'actions',
      title: '',
      width: 50,
      align: 'center',
      render: (_, row) => (
        <Button type="text" size="small" icon={<HolderOutlined />} onClick={(e) => open(e, row)} />
      ),
    },
  ];

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
        dataSource={aircraftMock.content}
        columns={columns}
        rowKey="id"
        pagination={{
          current: aircraftMock.number + 1,
          pageSize: aircraftMock.size,
          total: aircraftMock.totalElements,
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
  );
};
