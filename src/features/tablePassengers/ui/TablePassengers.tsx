import { Table } from '@shared/ui/table';

import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import { useGetPassangerListQuery } from '../model/tablePassengersApi';
import { useState, useEffect } from 'react';
import type { IContentPassengerTable } from '@shared/types';

import styles from './tablePassengers.module.scss'
import { type TablePaginationConfig, Button, Space, message, Input } from 'antd';
import { PlusOutlined, SaveOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import moment from 'moment';


export const PassengersPage = () => {
  const [page, setPage] = useState(0);
  const { data: passengerList, isSuccess, isLoading, isError } = useGetPassangerListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });
  const [data, setData] = useState<IContentPassengerTable[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<IContentPassengerTable>>({});

  useEffect(() => {
    if (isSuccess && passengerList?.content) {
      setData(passengerList.content)
    }
  }, [passengerList]);
 const isEditing = (record: IContentPassengerTable) => record.id === editingKey;

  const edit = (record: IContentPassengerTable) => {
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
      const index = newData.findIndex(item => id === item.id);
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

  const handleInputChange = (field: keyof IContentPassengerTable, value: string) => {
    setEditingData(prev => ({ ...prev, [field]: value }));
  };
    
  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
          setPage(pagination.current - 1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
        console.log(passengerList);
    }
  }, [passengerList]);

    const columns = [
        {
            title: 'iD',
            dataIndex: 'id',
        },
        {
            title: 'Имя, Фамилия, Отчество',
            render: (record: IContentPassengerTable) => (
                `${record.firstName} ${record.lastName} ${record.passport.middleName}`
            ),
        },
        {
            title: 'Пол',
            render: ({ passport } : IContentPassengerTable) => passport.gender === 'male' ? 'Муж.' : 'Жен.'
            
        },
        {
            title: 'Телефон',
            render: (record: IContentPassengerTable) => {
                return `+${record.phoneNumber}`;
            }
        },
        {
            title: 'Дата рождения',
            render: (record: IContentPassengerTable) => {
                const date = record.birthDate;
                return moment(date).format("DD.MM.YYYY");
            }

        },
        {
            title: 'Серийный номер',
            render: (record: IContentPassengerTable) => {
                return record.passport.serialNumberPassport
            }
        },
        {
            title: 'Гражданство',
            render: (record: IContentPassengerTable) => {
                return record.passport.passportIssuingCountry
            }
        },
        {
            title: 'Дата выдачи паспорта',
            render: (record: IContentPassengerTable) => {
                const date =  record.passport.passportIssuingDate;
                return moment(date).format("DD.MM.YYYY");
            }
        },
        {
        title: 'Действия',
        key: 'actions',
        width: 120,
        render: (_: any, record: IContentPassengerTable) => {
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
    ]   

    return (
        <div className={styles.wrapper}>
            <TableHeader
                title="Пассажиры"
                btnName="Добавить пассажира"
                btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
                // onBtnClick={handleBtnClick}
                className={styles.customHeader}
            />
            <Table<IContentPassengerTable> 
            dataSource={passengerList?.content} 
            columns={columns}
            onChange={handleTableChange}
            pagination={{
                position: ['bottomLeft'],
                showSizeChanger: false,
                current: (passengerList?.number ?? 0) + 1,
                pageSize: passengerList?.size,
                total: passengerList?.totalElements ?? 0,
        }} />
        </div>
    )
}