import { Table } from '@shared/ui/table';

import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import { useGetPassengerListQuery, useUpdatePassengerMutation } from '../model/tablePassengersApi';
import { useState, useEffect } from 'react';
import type { IContentPassengerTable } from '@shared/types';

import styles from './tablePassengers.module.scss'
import { type TablePaginationConfig, Button, Space, message, Input, DatePicker } from 'antd';
import { PlusOutlined, SaveOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import moment from 'moment';


export const PassengersPage = () => {
  const [page, setPage] = useState(0);
  const { data: passengerList, isSuccess, isLoading, isError } = useGetPassengerListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });
  const [updatePassenger] = useUpdatePassengerMutation()
  const [data, setData] = useState<IContentPassengerTable[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<IContentPassengerTable>>({});

  const [fullName, setFullName] = useState('');
  useEffect(() => {
    if (editingKey !== null) {
      setFullName(`${editingData.lastName ?? ''} ${editingData.firstName ?? ''}`);
    }
  }, [editingData, editingKey]);

  useEffect(() => {
    if (isSuccess && passengerList?.content) {
      setData(passengerList.content)
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

  const save =  async(id: number) => {
    try {
      console.log({id, ...editingData});
      await updatePassenger({id, ...editingData}).unwrap()
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

  // const handleInputChange = (field: keyof IContentPassengerTable, value: string) => {
  //   setEditingData(prev => ({ ...prev, [field]: value }));
  // };

  const handleInputChange = (changes: Partial<IContentPassengerTable>) => {
    setEditingData(prev => ({ ...prev, ...changes }));
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
              <Input 
              value={fullName}
              // onChange={(e) => {
              //   const value = e.target.value;
              //   setFullName(value);
              //   if(value === '') {
              //     handleInputChange({firstName: '', lastName: ''})
              //     return
              //   }
              //   const parth = value.split(' ')
              //   const lastName = parth[0]
              //   const firstName = parth.slice(1).join(' ') || ''
              //   handleInputChange({lastName, firstName})
              // }}
              />):
              (`${record.lastName} ${record.firstName}`)
            },
        },
        {
            title: 'Пол',
            render: (record: IContentPassengerTable) => {
                const editable = isEditing(record);
                return editable ? (<Input 
                  value={record.passport.gender === 'male' ? 'Муж.' : 'Жен.'}
                  // onChange={(e) => handleInputChange(repassport.gender, e.target.value)}
                  />) :
                (record.passport.gender === 'male' ? 'Муж.' : 'Жен.')
            }
            
        },
        {
            title: 'Телефон',
            render: (record: IContentPassengerTable) => {
                const editable = isEditing(record);
                return editable ? (<Input value={editingData.phoneNumber}
                onChange={(e) => {
                  handleInputChange({phoneNumber: e.target.value})
                }}/>) :
                (`+${record.phoneNumber}`)
            }
        },
        {
          title: 'Дата рождения',
          render: (record: IContentPassengerTable) => {
            const editable = isEditing(record);
            const date = editingData.birthDate ? moment(editingData.birthDate) : null;
            return editable ? (
              <DatePicker
                value={date}
                onChange={(dateMoment) => {
                  console.log(dateMoment.format('YYYY-MM-DD'));
                  handleInputChange({ birthDate: dateMoment.format('YYYY-MM-DD')});
                }}
                format="DD.MM.YYYY"
              />
            ) : (
              moment(record.birthDate).format("DD.MM.YYYY")
            );
          }
        },
        {
            title: 'Серийный номер',
            render: (record: IContentPassengerTable) => {
                const editable = isEditing(record);
                return editable ? (<Input value={record.passport.serialNumberPassport}/>):
                record.passport.serialNumberPassport
            }
        },
        {
            title: 'Гражданство',
            render: (record: IContentPassengerTable) => {
                const editable = isEditing(record);
                return editable ? (<Input value={record.passport.passportIssuingCountry}/>):
                record.passport.passportIssuingCountry
            }
        },
        {
            title: 'Дата выдачи паспорта',
            render: (record: IContentPassengerTable) => {
                const editable = isEditing(record);
                const date =  record.passport.passportIssuingDate;
                return editable ? (<Input value={moment(date).format("DD.MM.YYYY")}/>):
                moment(date).format("DD.MM.YYYY");
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