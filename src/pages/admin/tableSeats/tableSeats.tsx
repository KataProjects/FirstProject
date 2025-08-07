import { useEffect } from "react";

import { Table } from "@shared/ui/table/index";
import { TableHeader } from "@entities/tableHeader";

import { Spin } from "antd";
import { useGetSeatsQuery } from "./api/tableSeatsApi";
import { DropDownList } from "@features/dropDownList";

import styles from "./tableSeats.module.css"


export const TableSeatsPage = () => {
    interface ITableSeats {
        aircraftId: number;
        category: string;
        id: number;
        isLockedBack: boolean;
        isNearEmergencyExit: boolean;
        seatNumber: string;      
    }


    const { data, isLoading } = useGetSeatsQuery({});


    useEffect(() => console.log(data))

    if (isLoading) {
        return <Spin />
    }

    const i = {
        aircraftId: 2,
        category: "BUSINESS",
        id: 7,
        isLockedBack: true,
        isNearEmergencyExit: true,
        seatNumber: "2A",
    }

    const columns = [
        {
            title: "ID сидения",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Номер сидения",
            dataIndex: "seatNumber",
            key: "seatNumber"
        },
        {
            title: "Класс",
            dataIndex: "category",
            key: "category"
        },
        {
            title: "Неподвижное сидение",
            dataIndex: "isLockedBack",
            key: "isLockedBack",
            render: (isLocked: boolean) => isLocked ? "Да" : "Нет"
        },
        {
            title: "Близко к эсктренному выходу",
            dataIndex: "isNearEmergencyExit",
            key: "isNearEmergencyExit",
            render: (isNear: boolean) => isNear ? "Да" : "Нет"
        }
    ]


    
return (
    <div className={styles.tableSeats}>
        <TableHeader title="ИЛ-96-300 (Сидения)" btnName="Добавить сидение" extraContent={<DropDownList listTitle="Класс"/>}/>
        <Table dataSource={data.content} columns={columns}/>
    </div>
)
}