import { useEffect } from "react";
import { Table } from "@shared/ui/table/index";

export const TableSeatsPage = () => {
    interface ITableSeats {
        id: number;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }

    const columns = [
        {    
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Название",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Описание",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt"
        },
        
    ]

    const data: ITableSeats[] = [
        {
            id: 1,
            name: 'string',
            description: 'string',
            createdAt: 'string',
            updatedAt: 'string',
        },
    ]
return (
    <div>
        <Table dataSource={data} columns={columns} />
    </div>
)
}