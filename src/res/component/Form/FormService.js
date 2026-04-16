import './styleOfForm.css'
import { useState,useEffect } from 'react'
import {useBranch,apiUserService} from "../index"

const FormService = ({data,setDataItem,setDatas}) => {
    const {setIsLoading} = useBranch()
    const [service, setService] = useState({
        codeService: "",
        name: "",
        desc: ""
    })

    useEffect(() => {
        if (data) {
            setService({
                codeService: data?.serviceId || "",
                name: data?.serviceName || "",
                desc: data?.description || ""
            });
        } else {
            // Nếu dataEdit trống (sau khi lưu xong), reset form về rỗng
            setService({
                codeService: "",
                name: "",
                desc: ""
            });
        }
    }, [data]); 

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setService({
            ...service,
            [id]: value 
        })
    }

    const handleAddService = async () => {
        try{
            let method = ""
            let conditionUrl = ""

            conditionUrl = (data?.serviceId) ?   `/services/${data.serviceId}` : `/services`
            method = (data?.serviceId) ? 'PUT' : 'POST'
            setIsLoading(true)
            const res =  await fetch(apiUserService.baseURL+conditionUrl,{
                method: method,  
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    serviceId: service.codeService,
                    serviceName: service.name,
                    description: service.desc
                })
            })

            if(res.ok){
                if(data?.serviceId){
                    const data = await res.json()
                    setDatas(services => services.map( item => {
                        if(item.serviceId === data.data.serviceId){
                            item.serviceName = data.data.serviceName
                            item.description = data.data.description
                        }
                        return item
                    }))
                }
                else{
                    const data = await res.json()
                    setDatas( service => [...service,data.data])
                }
                setDataItem(null)
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("Lỗi khi thêm chi nhánh")
        }
    }

    const closeModal = () => {
        setDataItem(null)
    }
    return <>
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3 id="modal-title">Chỉnh sửa thông tin </h3>
            <form id="account-form">
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="codeService" className="input-field" placeholder="" value={service.codeService} onChange={handleInputChange}/>
                    <label htmlFor="codeService" className="input-label">Mã dịch vụ</label>
                </div>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="name" className="input-field" placeholder="" value={service.name} onChange={handleInputChange}/>
                    <label htmlFor="name" className="input-label">Tên dịch vụ</label>
                </div>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="desc" className="input-field" placeholder=""  value={service.desc} onChange={handleInputChange}/>
                    <label htmlFor="desc" className="input-label">Mô tả dịch vụ</label>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-save" onClick={handleAddService}>Lưu</button>
                    <button type="button" className="btn btn-cancel" onClick={closeModal}>Hủy</button>
                </div>
            </form>
        </div>
    </>
}
export default FormService