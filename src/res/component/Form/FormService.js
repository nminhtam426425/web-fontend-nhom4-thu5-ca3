import './styleOfForm.css'
import { useState,useEffect } from 'react'
import {apiUserService,useBranch} from "../index"

const FormService = ({data,setDataItem,setDatas}) => {
    const {setIsLoading} = useBranch()
    const closeModal = () => {
        setDataItem(null)
    }
    const [service, setService] = useState({
        name: ""
    })

    useEffect(() => {
        if (data) {
            setService({
                name: data.description || ""
            });
        } else {
            // Nếu dataEdit trống (sau khi lưu xong), reset form về rỗng
            setService({ name: "" });
        }
    }, [data]); 

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setService({
            ...service,
            [id]: value 
        })
    }

    const handleAddBranch = async () => {
        try{
            let method = ""
            let conditionUrl = ""

            conditionUrl = (data?.id) ?   `/amenities/${data.id}` : `/amenities`
            method = (data?.id) ? 'PUT' : 'POST'
            setIsLoading(true)
            const res =  await fetch(apiUserService.baseURL+conditionUrl,{
                method: method,  
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({description:service.name})
            })

            if(res.ok){
                setIsLoading(false)
                if(data?.id){
                    const data = await res.json()
                    setDatas(services => services.map( item => {
                        if(item.id === data.id)
                            item.description = data.description
                        return item
                    }))
                    setDataItem(null)
                }
                else{
                    const data = await res.json()
                    setDatas( service => [...service,data])
                    setDataItem(null)
                }
            }
            else 
                setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("Lỗi khi thêm chi nhánh")
        }
    }

    return <>
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3 id="modal-title">Chỉnh sửa thông tin </h3>
            <form id="account-form">
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="name" className="input-field" placeholder="" value={service.name} onChange={handleInputChange}/>
                    <label htmlFor="name" className="input-label">Tên dịch vụ</label>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-save" onClick={handleAddBranch}>Lưu</button>
                    <button type="button" className="btn btn-cancel" onClick={closeModal}>Hủy</button>
                </div>
            </form>
        </div>
    </>
}
export default FormService