import "./styleOfTable.css"
import RowTableService from "./RowTableService"
import { FaPlus } from "react-icons/fa"
const temp = {
    description: 'Mua 1 tang 1'
}
const TableAmenAndSerive = ({data,setDataItem,setDataOfService}) => {
    const props = {
        setDataItem,
        setDataOfService,    
    }
    return <>
        <div>
            <header>
                <h2 id="table-title">Danh sách {(data?.description || true) ? 'tiện nghi' :'dịch vụ' } có trong hệ thống</h2>
                <button className="btn btn-add" onClick={()=>setDataItem(temp)}>
                    <FaPlus/> Thêm mới
                </button>
            </header>

            <section className="table-container">
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                                {
                                    (data?.description || true) ? <th>Tên tiện nghi</th> :<th>Tên dịch vụ</th> 
                                }
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {
                            data.map( (item,index) => <RowTableService index={index} key={index} dataItem={item} {...props}/>)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default TableAmenAndSerive