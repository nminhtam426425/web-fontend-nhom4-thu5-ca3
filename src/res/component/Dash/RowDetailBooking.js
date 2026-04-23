const RowDetailBooking = ({dataOfRow}) => {
    let classForStatus = "status-badge"
    classForStatus+=" "
    classForStatus+=dataOfRow.status === 'chờ xác nhận' ? 'pending' : 'confirmed'

    return <>
         <tr>
            <td><strong>{dataOfRow.fullName}</strong></td>
            <td>{dataOfRow.roomTypeName}</td>
            <td>{dataOfRow.checkIn}</td>
            <td><span className={classForStatus}> {dataOfRow.status}</span></td>
        </tr>
    </>
}
export default RowDetailBooking