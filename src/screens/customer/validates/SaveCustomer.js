import useValidator from "../../../hook/validate"
function SaveCustomerValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("surrogate", "Tên đối tác không được bỏ trống"),
        useValidator.isPhone("phone", "Không phải định dạng số điện thoại"),
        useValidator.isRequired("name", "Tên Công Ty không được bỏ trống"),
    ])
}
export default SaveCustomerValidate;