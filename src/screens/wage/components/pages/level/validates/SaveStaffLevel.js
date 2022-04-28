import useValidator from "../../../../../../hook/validate"
function SaveStaffLevel(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("name", "Tên Cấp Bậc không được bỏ trống"),
        useValidator.isRequired("pay_level", "Lương Cấp Bậc không được bỏ trống"),
        useValidator.isRequired("allowance_pay", "Lương Phụ Cấp không được bỏ trống"),
    ])
}

export default SaveStaffLevel;