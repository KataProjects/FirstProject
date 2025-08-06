import { Table } from '@shared/ui/table';

import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import { useGetPassangerListQuery } from '../model/tablePassengersApi';
import { useState, useEffect } from 'react';
import type { Passenger } from '@features/tablePassengers/ui/dataTypes'; 

import styles from './tablePassengers.module.scss'
import { type TablePaginationConfig, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import moment from 'moment';

const columns = [
    {
        title: 'iD',
        dataIndex: 'id',
    },
    {
        title: 'Имя, Фамилия, Отчество',
        render: (record: Passenger) => (
            `${record.firstName} ${record.lastName} ${record.passport.middleName}`
        ),
    },
    {
        title: 'Пол',
        render: ({ passport } : Passenger) => passport.gender === 'male' ? 'Муж.' : 'Жен.'
        
    },
    {
        title: 'Телефон',
        render: (record: Passenger) => {
            return `+${record.phoneNumber}`;
        }
    },
    {
        title: 'Дата рождения',
        render: (record: Passenger) => {
            const date = record.birthDate;
            return moment(date).format("DD.MM.YYYY");
        }

    },
    {
        title: 'Серийный номер',
        render: (record: Passenger) => {
            return record.passport.serialNumberPassport
        }
    },
    {
        title: 'Гражданство',
        render: (record: Passenger) => {
            return record.passport.passportIssuingCountry
        }
    },
    {
        title: 'Дата выдачи паспорта',
        render: (record: Passenger) => {
            const date =  record.passport.passportIssuingDate;
            return moment(date).format("DD.MM.YYYY");
        }
    },
]   


export const PassengersPage = () => {
    const [page, setPage] = useState(0);
    const { data: paseengerList, isSuccess, isLoading, isError } = useGetPassangerListQuery({
        page: page,
        size: DEFAULT_PAGE_LIMIT,
    });

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current !== undefined) {
            setPage(pagination.current - 1);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log(paseengerList);
        }
    }, [paseengerList]);

    return (
        <div className={styles.wrapper}>
            <TableHeader
                title="Пассажиры"
                btnName="Добавить пассажира"
                btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
                // onBtnClick={handleBtnClick}
                className={styles.customHeader}
            />
            <Table<Passenger> 
            dataSource={paseengerList?.content} 
            columns={columns}
            onChange={handleTableChange}
            pagination={{
                position: ['bottomLeft'],
                showSizeChanger: false,
                current: (paseengerList?.number ?? 0) + 1,
                pageSize: paseengerList?.size,
                total: paseengerList?.totalElements ?? 0,
        }} />
        </div>
    )
}