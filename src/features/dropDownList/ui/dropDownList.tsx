import { Select } from "antd";
import { type dropDownListProps } from "../models/types";
import styles from "./dropDownList.module.css";
import { useDispatch } from "react-redux";
import { setCategory } from "@app/store/categoriesSlice";

export const DropDownList = ({ listTitle, options = [] }: dropDownListProps) => {
    const dispatch = useDispatch();

    const listData = options.map((el) => {
        return {value: el, label: el}
    })   

    return (
        <>
        <div className={styles.categoriesContainer}>{listTitle}</div>
            <Select             style={{width: "225px", 
                height: 50,
                boxShadow: "0px 5px 5px 0px #0000000F",
            }}
            
            onChange={(e) => {
                dispatch(setCategory(e))
            }}
            options={listData}
            />
        </>
    )
}