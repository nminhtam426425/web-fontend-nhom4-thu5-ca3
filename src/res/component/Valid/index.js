function validatePhoneNumber(phone) {
    const phoneRegex = /^0[0-9]{9}$/;
    if(phoneRegex.test(phone))
        return ""
    return "Không đúng định dạng sdt !"
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(email))
        return ""
    return "Không đúng định dạng email !"
}
// Ví dụ:
// console.log(validateEmail("test@gmail.com"));          // true
// console.log(validateEmail("user.name@domain.com.vn")); // true (nhiều dấu chấm)
// console.log(validateEmail("1user@gmail.com"));         // false (bắt đầu bằng số)
// console.log(validateEmail("nguyễn@gmail.com"));        // false (có dấu/unicode)

function validateStrEmpty(str){
    if(str.length !== 0)
        return ""
    return "Vui lòng không để trống !"
}

function validateNoSpecialChars(str) {
    // [\p{L}\p{N}]+ : 
    //    \p{L} : Bất kỳ ký tự chữ cái nào (bao gồm Latinh, Tiếng Việt có dấu, v.v.)
    //    \p{N} : Bất kỳ ký tự số nào

    // u : Flag quan trọng để hỗ trợ Unicode
    
    const regex = /^[\p{L}\p{N}]+$/u;
    
    if(regex.test(str))
        return ""
    return "Không chứa kí tự đặc biệt !"
}

function validateUsername(str) {
    const regex1 = /^[a-zA-Z][a-zA-Z0-9]{4,}$/
    if(!regex1.test(str))
        return "Tên đăng nhập không hợp lệ !"
    
    const regex = /^[\p{L}\p{N}]+$/u;
    
    if(regex.test(str))
        return ""
    return "Không chứa kí tự đặc biệt !"
}

function validateNumber(str){
    const regex1 = /^[0-9]{1,}$/
    if(!regex1.test(str))
        return "Chỉ nhập số !"
    const number =  Number(str)
    if(number < 1)
        return "Sức chứa không hợp lệ !"
    return ""
}


// kiểm tra biến validation, nếu vẫn còn message lỗi thì không cho nhấn lưu
const passValidation = (validation) => {
    for(let i in validation){
        if(validation[i] !== "")
            return false
    }
    return true
}

export {validatePhoneNumber,validateEmail,passValidation,validateStrEmpty,validateNoSpecialChars,validateUsername,validateNumber}