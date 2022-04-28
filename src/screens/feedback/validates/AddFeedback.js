import useValidator from "../../../hook/validate"
function AddFeedbackValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("customer_id", "Khách Hàng không được bỏ trống"),
        useValidator.isRequired("report_title", "Tiêu Đề Phản Hồi không được bỏ trống"),
        useValidator.isRequired("report_content", "Nội Dung Phản Hồi không được bỏ trống"),
    ])
}
export default AddFeedbackValidate;