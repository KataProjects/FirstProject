import {
  HolderOutlined,
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import {
  Button,
  Input,
  Space,
  Spin,
  message,
  type TablePaginationConfig,
} from 'antd';
import { type FC, useCallback, useEffect, useState } from 'react';
import {
  useGetAircraftListQuery,
  useUpdateAircraftMutation
} from '@features/tableAircraft/models/aircraftApi.ts';
import styles from './TableAircraft.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableAircraft: FC = () => {
  const [page, setPage] = useState(0);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<IContentAircraftTable>>({});

  const { data: aircraftList, isSuccess, isLoading, isError } = useGetAircraftListQuery({
    page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const [updateAircraft] = useUpdateAircraftMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('Получены данные:', aircraftList);
    }
  }, [isSuccess, aircraftList]);

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
      setEditingKey(null);
      setEditingData({});
    }
  };

  const isEditing = (record: IContentAircraftTable) => record.id === editingKey;

  const edit = (record: IContentAircraftTable) => {
    setEditingKey(record.id);
    setEditingData({ ...record });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingData({});
  };

  const save = async (id: number) => {
    try {
      await updateAircraft({ id, ...editingData }).unwrap();
      setEditingKey(null);
      setEditingData({});
      message.success('Изменения сохранены');
    } catch (errInfo) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleInputChange = (field: keyof IContentAircraftTable, value: string | number) => {
    setEditingData(prev => ({ ...prev, [field]: value }));
  };

  const columns: Array<IColumnTableAntd<IContentAircraftTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
      render: (text: string, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.model || ''}
              onChange={(e) => handleInputChange('model', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Номер',
      dataIndex: 'aircraftNumber',
      key: 'aircraftNumber',
      render: (text: string, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.aircraftNumber || ''}
              onChange={(e) => handleInputChange('aircraftNumber', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Год выпуска',
      dataIndex: 'modelYear',
      key: 'modelYear',
      render: (text: number, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.modelYear || ''}
              onChange={(e) => handleInputChange('modelYear', Number(e.target.value))}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Дальность полета (км)',
      dataIndex: 'flightRange',
      key: 'flightRange',
      render: (text: number, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.flightRange || ''}
              onChange={(e) => handleInputChange('flightRange', Number(e.target.value))}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: any, record: IContentAircraftTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="link"
              size="small"
              icon={<SaveOutlined />}
              onClick={() => save(record.id)}
            />
            <Button
              type="link"
              size="small"
              icon={<CloseOutlined />}
              onClick={cancel}
            />
          </Space>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            disabled={editingKey !== null}
            onClick={() => edit(record)}
          />
        );
      },
    },
    {
      key: 'sort',
      title: '',
      width: 50,
      align: 'center',
      render: () => <DragHandle />,
    },
  ];

  if (isLoading) return <Spin size="large" />;
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
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (aircraftList?.number ?? 0) + 1,
          pageSize: aircraftList?.size,
          total: aircraftList?.totalElements ?? 0,
        }}
      />
    </div>
  );
};