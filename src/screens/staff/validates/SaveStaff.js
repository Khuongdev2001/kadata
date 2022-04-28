import useValidator from "../../../hook/validate"
function AddFeedbackValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("fullname", "Tên Nhân Viên không được bỏ trống"),
        useValidator.isRequired("staff_level", "Cấp Bậc không được bỏ trống"),
        useValidator.isRequired("phone", "Số Điệnt Thoại không được bỏ trống"),
        useValidator.isPhone("phone", "Không phải định dạng Số Điện Thoại"),
        useValidator.isNumber("bank_account_number", "Số Tài Khoản phải định dạng số")
    ])
}
export default AddFeedbackValidate;