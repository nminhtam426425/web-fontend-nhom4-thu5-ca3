const RowDetailBooking = ({dataOfRow}) => {
    let classForStatus = "status-badge"
    classForStatus+=" "
    classForStatus+=dataOfRow.status.toLowerCase()

    return <>
         <tr>
            <td><strong>{dataOfRow.name}</strong></td>
            <td>{dataOfRow.room}</td>
            <td>{dataOfRow.date}</td>
            <td><span className={classForStatus}> {dataOfRow.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ xử lý'}</span></td>
        </tr>
    </>
}
export default RowDetailBooking