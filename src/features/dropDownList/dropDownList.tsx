export const DropDownList = (listTitle: any, ...props: any) => {
    const allProps = [...props];
    return (
        <>
        <form>
            <label htmlFor="">{listTitle}</label>
            <select>
                {allProps.map((el: any) => <option>{el}</option>)}
            </select>
        </form>

        </>
    )
}