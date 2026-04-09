import {apiUserService,useBranch} from "../index"

const RowTableImage = ({img,index,setRoomImage,dataDetail,setDataDetail,roomImage,setImgToUpload}) => {
    const {setIsLoading} = useBranch()
    const handleDeleteImage = async () => {
        if(window.confirm("Bạn thực sự muốn xóa ảnh này ?")){
            if(img.isNew){
                setRoomImage( images => images.filter( item => item.imageId !== img.imageId))
                setImgToUpload(images => images.filter( item => item.imageId !== img.imageId))
                let temp = dataDetail
                temp.images = roomImage.filter( item => item.imageId !== img.imageId)
                setDataDetail(temp)
            }
            // xoa hinh da upload tren cloud
            else{
                try{
                    setIsLoading(true)
                    const res = await fetch(apiUserService.baseURL+`/room-images/${img.imageId}`,{
                        method:'DELETE'
                    })
                    setIsLoading(false)
                    if(res.ok){
                        const data = await res.text()
                        if(data === `Đã xóa ảnh có id ${img.imageId}`){
                            setRoomImage( images => images.filter( item => item.imageId !== img.imageId))
                            let temp = dataDetail
                            temp.images = roomImage.filter( item => item.imageId !== img.imageId)
                            setDataDetail(temp)
                        }
                    }
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
                <button className="btn btn-delete" onClick={handleDeleteImage}>Xóa</button>
            </td>
        </tr>
    </>
}
export default RowTableImage