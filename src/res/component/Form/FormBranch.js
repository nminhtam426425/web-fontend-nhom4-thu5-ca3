import './styleOfForm.css'
import { useState,useEffect } from 'react'
import {apiUserService} from "../index"
import {validateEmail,validatePhoneNumber,passValidation,validateStrEmpty} from "../Valid"

const FormBranch = ({data,setDataItem,setDatas,setDatasActive}) => {
    const closeModal = () => {
        setDataItem(null)
    }
    const [branch, setBranch] = useState({
        name_branch: "",
        phone_branch: "",
        email_branch: "",
        address_branch:"",
        rooms_branch:"",
        desc_branch:""
    })

    // kiểm tra valid - cũng dựa vào id của input text field 
    const [errorBranch,setErrorBranch] = useState({
        name_branch: "",
        phone_branch: "",
        email_branch: "",
        address_branch:"",
        desc_branch:""
    })

    useEffect(() => {
        if (data) {
            setBranch({
                name_branch: data.branchName || "",
                phone_branch: data.phone || "",
                email_branch: data.email || "",
                address_branch: data.address || "",
                rooms_branch: data.rooms || "",
                desc_branch: data.description || ""
            });
            setErrorBranch({
                name_branch: validateStrEmpty(data.branchName) || "",
                phone_branch: validatePhoneNumber(data.phone) || "",
                email_branch: validateEmail(data.email) || "",
                address_branch: validateStrEmpty(data.address) || "",
                desc_branch: validateStrEmpty(data.description) || ""
            });
        } else {
            // Nếu dataEdit trống (sau khi lưu xong), reset form về rỗng
            setBranch({ name_branch: "", phone_branch: "", email_branch: "",address_branch:"",rooms_branch:"" });
        }
    }, [data]); 

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setBranch({
            ...branch,
            [id]: value 
        })
        if(id === 'phone_branch'){
            setErrorBranch({
                ...errorBranch,
                [id]: validatePhoneNumber(value)
            })
        }
        else if(id === 'email_branch'){
            setErrorBranch({ 
                ...errorBranch,
                [id]: validateEmail(value)
            })
        }
        else{
            setErrorBranch({
                ...errorBranch,
                [id]: validateStrEmpty(value)
            })
        }
    }

    const handleAddBranch = async () => {
        try{
            if(!passValidation(errorBranch))
                return 
            let method = ""
            let conditionUrl = ""

            conditionUrl = (data?.branchId) ?   `/branches/${data.branchId}` : `/branches?userId=${localStorage.getItem('admin_id')}`
            method = (data?.branchId) ? 'PUT' : 'POST'

            const res =  await fetch(apiUserService.baseURL+conditionUrl,{
                method: method,  
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    branchName:branch.name_branch,
                    address:branch.address_branch,
                    phone:branch.phone_branch,
                    email:branch.email_branch,
                    description:branch.desc_branch,
                    isActive:true
                })
            })

            if(res.ok){
                if(data?.branchId){
                    const data = await res.json()
                    setDatas(branches => branches.map( item => {
                        if(item.branchId === data.branchId){
                            item.branchName = data.branchName
                            item.email = data.email
                            item.phone = data.phone
                            item.description = data.description
                        }
                        return item
                    }))
                }
                else{
                    const data = await res.json()
                    setDatas( branches => [...branches,data])
                    setDatasActive(branches => [...branches,data])
                }
                setDataItem(null)
            }
        }
        catch(err){
            console.log("Lỗi khi thêm chi nhánh")
        }
    }

    if(data)
        return <>
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3 id="modal-title">Chỉnh sửa thông tin chi nhánh</h3>
            <form id="account-form">
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="name_branch" className="input-field" placeholder="" value={branch.name_branch} onChange={handleInputChange}/>
                    <label htmlFor="name" className="input-label">Tên chi nhánh</label>
                    <span className="validation">{errorBranch.name_branch}</span>
                </div>
                

                <div className="form-row">
                    <div className="input-group" style={{width: '100%'}}>
                        <input type="text" id="phone_branch" className="input-field" placeholder="" value={branch.phone_branch} onChange={handleInputChange}/>
                        <label htmlFor="phone_branch" className="input-label">Số điện thoại chi nhánh</label>
                        <span className="validation">{errorBranch.phone_branch}</span>
                    </div>
                    <div className="input-group" style={{width: '100%'}}>
                        <input type="text" id="email_branch" className="input-field" placeholder="" value={branch.email_branch} onChange={handleInputChange}/>
                        <label htmlFor="email_branch" className="input-label">Email chi nhánh</label>
                        <span className="validation">{errorBranch.email_branch}</span>
                    </div>
                </div>

                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="address_branch" className="input-field" placeholder="" value={branch.address_branch} onChange={handleInputChange}/>
                    <label htmlFor="address_branch" className="input-label">Địa chỉ chi nhánh</label>
                    <span className="validation">{errorBranch.address_branch}</span>
                </div>

                <div className="input-group" style={{width: '100%'}}>
                    <textarea type="text" id="desc_branch" className="input-field" placeholder="" value={branch.desc_branch} onChange={handleInputChange} style={{height:'100px'}}></textarea>
                    <label htmlFor="desc_branch" className="input-label">Mô tả chi nhánh</label>
                    <span className="validation" style={{top:'95%'}}>{errorBranch.desc_branch}</span>
                </div>

                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="rooms_branch" className="input-field" placeholder="" disabled value={branch.rooms_branch}/>
                    <label htmlFor="rooms_branch" className="input-label">Số phòng</label>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-save" onClick={handleAddBranch} 
                                                                    style={{cursor: passValidation(errorBranch) ? 'pointer' : 'not-allowed'}} 
                                                                    disabled={passValidation(errorBranch) ? false : true}>
                        Lưu
                    </button>
                    <button type="button" className="btn btn-cancel" onClick={closeModal}>Hủy</button>
                </div>
            </form>
        </div>
         </>
    else
        return <></>
}
export default FormBranch