
const MemberLevel = ({amount}) => {
    if(amount > 20000000)
        return  "Dadđy"
    else if(amount > 9999999)
        return "VIP"
    else if(amount > 999999)
        return "Bạn mới"
    else if(amount > 0)
        return "Thành viên"
    return "Thành viên mới"
}

const MemberShipLevel = (amount) => {
    if(amount > 20000000)
        return  "Daddy - Đã chi: " + amount.toLocaleString('vi-VN') + 'đ'
    else if(amount > 10000000)
        return "VIP - Đã chi: " + amount.toLocaleString('vi-VN') + 'đ'
    else if(amount > 1000000)
        return "Bạn mới - Đã chi: " + amount.toLocaleString('vi-VN') + 'đ'
    else if(amount > 0)
        return "Thành viên - Đã chi: " + amount.toLocaleString('vi-VN') + 'đ'
    
    return "Thành viên mới - Đã chi: " + amount.toLocaleString('vi-VN') + 'đ'
}

const PrintAmountVND = ({amount}) => {
    return amount.toLocaleString('vi-VN') + ' VNĐ'
}

export {MemberLevel,MemberShipLevel,PrintAmountVND}