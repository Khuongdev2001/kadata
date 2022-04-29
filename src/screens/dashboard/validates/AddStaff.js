import useValidator from "../../../hook/validate"
function AssignStaffValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("fullname", "Tên Khách Hàng không được bỏ trống"),
    ])
}
export default AssignStaffValidate;