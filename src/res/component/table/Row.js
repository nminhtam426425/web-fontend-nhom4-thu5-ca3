import {apiUserService} from "../index"
const Row = ({user,countUser,handleChange,handleUserEdit}) => {
    let dataRow = []

    for(let i in user){
        if(i !== "id")
            dataRow.push(user[i])
    }

    const handleDeleteUser = async (user) => {
        
        try {
            const response = await fetch(apiUserService.baseURL+"/delete",{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:user.id,
                })
                
            })
            const data = await response.json()

            if(data.code === 1001){
                handleChange()
            }
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error)
        }
    }

    return <tr>
        <td>{countUser}</td>
        {
            dataRow.map( (cellData,index) => <td key={index}>
                {cellData}
            </td>)
        }
        <td>
            <button className="btn bg-danger" onClick={() => handleDeleteUser(user)}>Delete</button>
            <button className="btn bg-warning" onClick={() => handleUserEdit(user)}>Edit</button>
        </td>
    </tr>
}
export default Row