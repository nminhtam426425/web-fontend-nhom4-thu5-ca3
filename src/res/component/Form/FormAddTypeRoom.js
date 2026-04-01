import { useEffect, useState } from "react"
import "./styleOfForm.css"
import { useBranch,apiUserService } from "../index"

const FormAddStyleRoom = ({setDataItem}) => {
    const [amenities,setAmneities] = useState([])
    let amenitiesForCreate =[]
    const {setIsLoading} = useBranch()
    useEffect(() => {
        const handleFetchAmenities = async ()  => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+'/amenities')
                if(res.ok){
                    setIsLoading(false)
                    const data  = await res.json()
                    setAmneities(data)
                }
                else
                    setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("loi roi ni oi !")
            }
        }
        handleFetchAmenities()
    },[])

    const handleAddTyoeRoom = async () => {
        // try{
        //     setIsLoading(true)
        //     const res = await fetch()
        //     if(res.ok){
        //         setIsLoading(false)
        //         const data  = await res.json()
        //         setAmneities(data)
        //     }
        //     else
        //         setIsLoading(false)
        // }
        // catch(err){
        //     setIsLoading(false)
        //     console.log("loi roi ni oi !")
        // }
        console.log(amenitiesForCreate)
    }

    const handleImageChange = (e) => {
        // const file = e.target.files[0];
        // if (file) {
        //     URL.revokeObjectURL(staff.review_avatar)
        //     setStaff({
        //         ...staff,
        //         review_avatar: URL.createObjectURL(file)
        //     })
        // }
    }

    const handleOnChangeService = (e) => {
        let isChose = e.target.checked
        let valueAmenities = e.target.value
        if(isChose){
            amenitiesForCreate.push( valueAmenities)
        }
        else{
            amenitiesForCreate = amenitiesForCreate.filter( item => item !== valueAmenities)
        }
    }

    return <>
        <div className="modal-content">
            <span className="close" onClick={()=>setDataItem(null)}>&times;</span>
            <h3 style={{margin:'10px 0'}}>Thêm loại phòng mới</h3>
            <form id="formType">
                <input type="text" placeholder="Tên loại phòng" required/>
                <br/>
                <label>Chọn ảnh:</label>
                <input type="file" multiple onChange={handleImageChange}/>
                <div className="checkbox-group">
                    <p>Tiện nghi:</p>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {
                            amenities.map( (item,index) =>  
                                <label style={{margin:'10px',Width:'40px'}} key={index}>
                                    <input value={item.id} type="checkbox" onChange={handleOnChangeService}/>{item.description}
                                </label>
                            )
                        }
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddTyoeRoom}>Lưu</button>
            </form>
        </div>
    </>
}

export default FormAddStyleRoom