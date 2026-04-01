import "./styleOfForm.css"
const FormShowImage = ({data,setDataItem}) => {
    return <>
     <div className="modal-content" style={{width:'600px',position:'relative'}}>
            <span className="close" onClick={() => setDataItem(null)} style={{color:'black',fontSize:'40px',position:'absolute',top:0,right:0}}>&times;</span>
            <div>
                <img src={data} alt="pic modal" style={{width:'100%'}}/>
            </div>
        </div>
    </>
}

export default FormShowImage