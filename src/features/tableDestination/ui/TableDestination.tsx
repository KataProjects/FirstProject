
import { HolderOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

import { TableHeader } from '@entities/tableHeader';
import { AddButton } from '@shared/ui/AddButton';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentDestinationTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button, Input, Space, Spin, type TablePaginationConfig, message } from 'antd';

import { type FC, useCallback, useEffect, useState } from 'react';

import { useGetDestinationListQuery } from '../models/destinationApi';
import styles from './TableDestination.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableDestination: FC = () => {
  const [page, setPage] = useState(0);
  const {
    data: destinationList,
    isSuccess,
    isLoading,
    isError,
  } = useGetDestinationListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const [data, setData] = useState<IContentDestinationTable[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<IContentDestinationTable>>({});

  useEffect(() => {
    if (isSuccess && destinationList?.content) {
      setData(destinationList.content);
    }
  }, [destinationList]);

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const isEditing = (record: IContentDestinationTable) => record.id === editingKey;

  const edit = (record: IContentDestinationTable) => {
    setEditingKey(record.id);
    setEditingData({ ...record });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingData({});
  };

  const save = (id: number) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...editingData,
        });
        setData(newData);
        setEditingKey(null);
        setEditingData({});
        message.success('Изменения сохранены');
      }
    } catch (errInfo) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleInputChange = (field: keyof IContentDestinationTable, value: string) => {
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
  };

  const columns: Array<IColumnTableAntd<IContentDestinationTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Страна',
      dataIndex: 'countryName',
      key: 'countryName',
      render: (text: string, record: IContentDestinationTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.countryName || ''}
              onChange={(e) => handleInputChange('countryName', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Город',
      dataIndex: 'cityName',
      key: 'cityName',
      render: (text: string, record: IContentDestinationTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.cityName || ''}
              onChange={(e) => handleInputChange('cityName', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Имя аэропорта',
      dataIndex: 'airportName',
      key: 'airportName',
      render: (text: string, record: IContentDestinationTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.airportName || ''}
              onChange={(e) => handleInputChange('airportName', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Код аэропорта',
      dataIndex: 'airportCode',
      key: 'airportCode',
      render: (text: string, record: IContentDestinationTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.airportCode || ''}
              onChange={(e) => handleInputChange('airportCode', e.target.value)}
              size="small"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Часовой пояс',
      dataIndex: 'timezone',
      key: 'timezone',
      render: (text: string, record: IContentDestinationTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.timezone || ''}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
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
      render: (_: any, record: IContentDestinationTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="link"
              size="small"
              icon={<SaveOutlined />}
              onClick={() => save(record.id)}
            />
            <Button type="link" size="small" icon={<CloseOutlined />} onClick={cancel} />
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

  return isLoading ? (
    <Spin size="large" />
  ) : isError ? (
    <div>Oops error</div>
  ) : isSuccess ? (
    <div className={styles.wrapper}>
      <TableHeader
        title="Место назначения"
        extraContent={<AddButton text="Добавить пункт назначения" onClick={handleBtnClick} />}
        className={styles.customHeader}
      />

      <Table<IContentDestinationTable>
        dataSource={destinationList?.content}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (destinationList?.number ?? 0) + 1,
          pageSize: destinationList?.size,
          total: destinationList?.totalElements ?? 0,
          onChange: () => {
            setEditingKey(null);
            setEditingData({});
          },
        }}
      />
    </div>
  ) : null;
};
