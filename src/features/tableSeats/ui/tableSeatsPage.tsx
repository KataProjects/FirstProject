import { useSelector } from "react-redux";

import { Table } from "@shared/ui/table/index";
import { TableHeader } from "@entities/tableHeader";

import { Spin } from "antd";
import { useGetSeatsQuery, useGetCategoriesQuery } from "../models/seatsApi";
import { DropDownList } from "@features/dropDownList/ui/index";

import styles from "./tableSeats.module.css"


export const TableSeatsPage = () => {
    const { category } = useSelector((state: any) => state.categories)
    const { data: seatsData, isLoading: isLoadingSeats } = useGetSeatsQuery({});
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({});

const categoties = categoriesData?.content.map((el: any) => {
    return el.categoryType
});

const filteredCategories =  seatsData?.content.filter((el: any) => {
    return el.category === category
}) 

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


    if (isLoadingSeats || isLoadingCategories) {
        return <Spin />
    }

    
return (
    <div className={styles.tableSeats}>
        <TableHeader title="ИЛ-96-300 (Сидения)" btnName="Добавить сидение" extraContent={<DropDownList listTitle="Класс:" options={categoties} />}/>
        <Table dataSource={category ? filteredCategories : seatsData.content} columns={columns}/>
        
    </div>
)
}