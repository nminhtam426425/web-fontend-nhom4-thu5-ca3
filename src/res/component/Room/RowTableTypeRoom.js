import "./styleOfRoom.css"
const RowTableTypeRoom = ({setIsClick,data,index}) => {
    const handleIsClick = () => {
        setIsClick(index)
    } 
    return <>
            <tr>
                <td>{data.typeName}</td>
                <td style={{width:'150px',height:'100px'}}><img src={data.images[0]} alt="std" style={{width:'100%'}}/></td>
                <td style={{textAlign:'center'}}>{data?.rooms || 0}</td>
                <td style={{textAlign:'center'}}>{data?.capacity} người/phòng</td>
                <td style={{textAlign:'center'}}><button className="btn btn-info" onClick={handleIsClick}>Chi tiết</button></td>
            </tr>
    </>
}
export default RowTableTypeRoom