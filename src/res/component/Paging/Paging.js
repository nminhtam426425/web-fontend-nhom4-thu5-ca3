import "./styleOfPaging.css"

const ArrowPage = ({value,handlePage,currentPage,totalPage}) => {
    let disabledIsTrueOrFalse = false
    if(value === "<" && currentPage === 1)
        disabledIsTrueOrFalse = true
    else if(value === ">" && currentPage === totalPage)
        disabledIsTrueOrFalse = true
    return <button className="navBtn" disabled={disabledIsTrueOrFalse} onClick={handlePage}>
        {value}
    </button>
}

const PageButton = ({value,currentPage,setCurrentPage,setDetailOfUser}) => {
    const handleClickPage = (page) => {
        setDetailOfUser({})
        setCurrentPage(page)
    }
    return <button className={(value===currentPage)?"pageBtn active":"pageBtn"} onClick={()=>handleClickPage(value)}>
        {value}
    </button>
}

const Dots = () => {
    return <div className="dots">
        ...
    </div>
}

const Paging = ({currentPage,totalPage,setCurrentPage,setDetailOfUser}) => {
    // gia tri mac dinh
    const pages = [{value:1,type:"button"}]

    const handleNextPage = (pages) => {
        if(pages === totalPage)
            return
        setDetailOfUser({})
        setCurrentPage(current => current+1)
    }
    
    const handlePrePage = (pages) => {
        if(pages === 1)
            return
        setDetailOfUser({})
        setCurrentPage(current => current-1)
    }

    let start = Math.max(2,currentPage-1)
    let end = Math.min(totalPage-1,currentPage+1)

    // truong hop dac biet, current nam o vi tri dau hoac cuoi 
    if(totalPage > 2){
        if(currentPage === 1){
            start = 2
            end = 3
        }
         
        if(currentPage >= (totalPage - 2) && (totalPage > 4)){
            start = totalPage - 2
            end = totalPage - 1
        }
    }

    if(start > 2)
        pages.push({value:"...",type:"dots"})

    for(let i = start; i <= end; i++)
        pages.push({value:i,type:"button"})

    if(end < totalPage - 1)
        pages.push({value:"...",type:"dots"})

    if (end < totalPage && totalPage !== 1) {
        pages.push({value:totalPage,type:"button"})
    }

    return <div className="pagination" style={{display: (totalPage===0) ? 'none' : 'flex'}}>
        <ArrowPage value="<" handlePage={handlePrePage} currentPage={currentPage} totalPage={totalPage}/>
        {
            pages.map(
                (item,key)=>{
                    if(item.type === "dots")
                        return <Dots key={key}/>
                    else
                        return <PageButton value={item.value} key={key} currentPage={currentPage} setCurrentPage={setCurrentPage} setDetailOfUser={setDetailOfUser}/>
                }
            )
        }
        <ArrowPage value=">" handlePage={handleNextPage} currentPage={currentPage} totalPage={totalPage}/>
    </div>
}

export default Paging