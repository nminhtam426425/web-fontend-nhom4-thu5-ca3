import {apiUserService,customeFetch,useBranch} from "../index"

const RowTableImage = ({img,index,setRoomImage,dataDetail,setDataDetail,roomImage,handleDeleteImage}) => {
    const {setIsLoading} = useBranch()
    const handleDeleteImageAtTable = async () => {
        if(window.confirm("Bạn thực sự muốn xóa ảnh này ?")){
            // xoa hinh chua up len cloud
            if(img.isNew)
                handleDeleteImage(img)
            // xoa hinh da upload tren cloud
            else{
                try{
                    setIsLoading(true)
                    const res = await customeFetch(apiUserService.baseURL+`/room-images/${img.imageId}`,'authen','DELETE')
                    if(res.ok){
                        const data = await res.text()
                        if(data === `Đã xóa ảnh có id ${img.imageId}`){
                            setRoomImage( images => images.filter( item => item.imageId !== img.imageId))
                            let temp = dataDetail
                            temp.images = roomImage.filter( item => item.imageId !== img.imageId)
                            setDataDetail(temp)
                        }
                    }
                    setIsLoading(false)
                }
                catch(err){
                    setIsLoading(false)
                    console.log(err," loixoa anh")
                }
            }
        }
    }

    return <>
        <tr>
            <td>{index + 1}</td>
            <td><img src={img?.url || img.imageUrl} alt={"and"+index} className="img-preview"/></td>
            <td>{img?.name || "anh "+(index+1) }</td>
            <td>
                <button className="btn btn-delete" onClick={handleDeleteImageAtTable}>Xóa</button>
            </td>
        </tr>
    </>
}
export default RowTableImage