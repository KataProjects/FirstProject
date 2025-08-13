import { CloseOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentPassengerTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import {
  Button,
  DatePicker,
  Input,
  Select,
  Space,
  type TablePaginationConfig,
  message,
} from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';

import { useGetPassengerListQuery, useUpdatePassengerMutation } from '../model/tablePassengersApi';
import styles from './tablePassengers.module.scss';

export const PassengersPage = () => {
  const [page, setPage] = useState(0);
  const {
    data: passengerList,
    isSuccess,
    isLoading,
    isError,
  } = useGetPassengerListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });
  const [updatePassenger] = useUpdatePassengerMutation();
  const [data, setData] = useState<IContentPassengerTable[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<IContentPassengerTable>>({});

  useEffect(() => {
    if (isSuccess && passengerList?.content) {
      setData(passengerList.content);
    }
  }, [passengerList]);

  const isEditing = (record: IContentPassengerTable) => record.id === editingKey;

  const edit = (record: IContentPassengerTable) => {
    console.log(record);
    setEditingKey(record.id);
    setEditingData({ ...record });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingData({});
  };

  const save = async (id: number) => {
    try {
      console.log({ id, ...editingData });
      await updatePassenger({ id, ...editingData }).unwrap();
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

  const handleInputChange = (changes: Partial<IContentPassengerTable>) => {
    setEditingData((prev) => ({ ...prev, ...changes }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }

    setEditingKey(null);
    setEditingData({});
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
      title: 'Фамилия, Имя, Отчество',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <div className={styles.nameInputs}>
            <Input
              value={editingData.lastName}
              onChange={(e) => handleInputChange({ lastName: e.target.value })}
              placeholder="Фамилия"
            />
            <Input
              value={editingData.firstName}
              onChange={(e) => handleInputChange({ firstName: e.target.value })}
              placeholder="Имя"
            />
            <Input
              value={editingData.passport?.middleName}
              onChange={(e) =>
                handleInputChange({
                  passport: {
                    ...editingData.passport,
                    middleName: e.target.value,
                  },
                })
              }
              placeholder="Отчество"
            />
          </div>
        ) : (
          `${record.lastName} ${record.firstName} ${record.passport.middleName}`
        );
      },
    },
    {
      title: 'Пол',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Select
            value={editingData.passport?.gender}
            onChange={(value) =>
              handleInputChange({
                passport: { ...editingData.passport, gender: value },
              })
            }
            options={[
              { value: 'male', label: 'Муж.' },
              { value: 'female', label: 'Жен.' },
            ]}
          />
        ) : record.passport.gender === 'male' ? (
          'Муж.'
        ) : (
          'Жен.'
        );
      },
    },
    {
      title: 'Телефон',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            value={editingData.phoneNumber}
            onChange={(e) => {
              handleInputChange({ phoneNumber: e.target.value });
            }}
          />
        ) : (
          `+${record.phoneNumber}`
        );
      },
    },
    {
      title: 'Дата рождения',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const value = dayjs(editingData.birthDate || record.birthDate, 'YYYY-MM-DD');
        return editable ? (
          <DatePicker
            key={`date-${record.id}`}
            value={value?.isValid() ? value : null}
            onChange={(date) => {
              handleInputChange({
                birthDate: date?.format('YYYY-MM-DD') || '',
              });
            }}
            format="DD.MM.YYYY"
            allowClear={false}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
          />
        ) : value?.isValid() ? (
          value.format('DD.MM.YYYY')
        ) : (
          'Не указана'
        );
      },
    },
    {
      title: 'Серийный номер',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            value={editingData.passport?.serialNumberPassport}
            onChange={(e) =>
              handleInputChange({
                passport: {
                  ...editingData.passport,
                  serialNumberPassport: e.target.value,
                },
              })
            }
            placeholder="Серия и номер паспорта"
          />
        ) : (
          record.passport.serialNumberPassport
        );
      },
    },
    {
      title: 'Гражданство',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            value={editingData.passport?.passportIssuingCountry}
            onChange={(e) =>
              handleInputChange({
                passport: {
                  ...editingData.passport,
                  passportIssuingCountry: e.target.value,
                },
              })
            }
            placeholder="Гражданство"
          />
        ) : (
          record.passport.passportIssuingCountry
        );
      },
    },
    {
      title: 'Дата выдачи паспорта',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const value = dayjs(editingData.passport?.passportIssuingDate || record.passport.passportIssuingDate, 'YYYY-MM-DD');
        return editable ? (
          <DatePicker
            key={`date-${record.id}`}
            value={value?.isValid() ? value : null}
            onChange={(date) => {
              handleInputChange({
                  passport: {
                  ...editingData.passport,
                  passportIssuingDate: date?.format('YYYY-MM-DD') || '',
                },
              });
            }}
            format="DD.MM.YYYY"
            allowClear={false}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
          />
        ) : value?.isValid() ? (
          value.format('DD.MM.YYYY')
        ) : (
          'Не указана'
        );
      },
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
  ];

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Пассажиры"
        btnName="Добавить пассажира"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
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
        }}
      />
    </div>
  );
};
