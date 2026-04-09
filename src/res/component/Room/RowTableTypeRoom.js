import "./styleOfRoom.css"
const RowTableTypeRoom = ({data,index,setCurrentScroll,setState,setDataDetail,setIsClick}) => {
    const handleIsClick = () => {
        setIsClick(index)
        setDataDetail(data)
        setCurrentScroll(0)
        setState('detail')
    } 
    const handleIsClickForUpdate = () => {
        setIsClick(index)
        setDataDetail(data)
        setCurrentScroll(0)
        setState('update')
    }
    return <>
            <tr>
                <td>{data.typeName}</td>
                <td style={{width:'150px',height:'100px'}}><img src={data?.images[0].imageUrl} alt="std" style={{width:'100%'}}/></td>
                <td style={{textAlign:'center'}}>{data?.totalRooms || 0}</td>
                <td style={{textAlign:'center'}}>{data?.capacity} người/phòng</td>
                <td style={{textAlign:'center'}}>
                    <button className="btn btn-info" style={{marginRight:'5px'}} onClick={handleIsClick}>Chi tiết</button>
                    <button className="btn btn-primary" onClick={handleIsClickForUpdate}>Chỉnh sửa</button>
                </td>
            </tr>
    </>
}
export default RowTableTypeRoom