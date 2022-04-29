import useValidator from "../../../hook/validate"
function AssignCustomerValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("name", "Tên đối tác không được bỏ trống"),
        useValidator.isRequired("qty", "Số lượng yêu cầu không được bỏ trống"),
        useValidator.minValue("qty", "Số lượng yêu cầu ít nhất là 1", 1),
    ])
}
export default AssignCustomerValidate;