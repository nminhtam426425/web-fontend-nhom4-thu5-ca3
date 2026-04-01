import "./styleOfForm.css"

const FormAddRoom = ({setDataItem}) => {
    return <>
         <div className="modal-content">
            <span className="close" onClick={()=>setDataItem(null)}>&times;</span>
            <h3 style={{margin:'10px 0'}}>Thêm phòng mới</h3>
            <form id="formRoom">
                <input type="text" placeholder="Nhập mã phòng (VD: B101)" required/>
                <button type="submit" className="btn btn-success">Thêm mới</button>
            </form>
        </div>
    </>
}

export default FormAddRoom