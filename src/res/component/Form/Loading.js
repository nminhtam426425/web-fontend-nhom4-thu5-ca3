import "./styleOfForm.css"

const Loading = ({message}) => {
    return <>
        <div id="loading">
            <div className="loading-box">
                <div className="spinner"></div>
                <p>{message}</p>
            </div>
        </div>
    </>
}
export default Loading