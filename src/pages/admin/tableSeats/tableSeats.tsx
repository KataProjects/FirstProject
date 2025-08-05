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

    const columns: ITableSeats[] = [
        {    id: 1,
            name: 'string',
            description: 'string',
            createdAt: 'string',
            updatedAt: 'string',
        },
        
    ]
return (
    <div>
        <Table dataSource={[]} columns={columns} />
    </div>
)
}