import useValidator from "../../../hook/validate"
function SaveAdminValidate(value, action) {
    return useValidator(value, [
        useValidator.isRequired("email", "Email không được bỏ trống"),
        useValidator.isRequired("password", "Mật khẩu không được bỏ trống", action.current.isAdd),
        useValidator.isRequired("fullname", "Họ và Tên không được bỏ trống"),
        useValidator.isEmail("email", "Không phải định dạng Email"),
        useValidator.min("password", 6, "Mật khẩu ít nhất 6 kí tự")
    ])
}

export default SaveAdminValidate;