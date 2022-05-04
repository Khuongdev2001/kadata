import useValidator from "../../../hook/validate";

function SaveResultEventValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("buyer_name", "Tên khách hàng không được bỏ trống"),
        useValidator.isRequired("buyer_phone", "Số điện thoại khách hàng không được bỏ trống"),
        useValidator.isRequired("turnover", "Doanh Thu không được bỏ trống"),
        useValidator.isRequired("customer_id", "Khách hàng không được bỏ trống"),
        useValidator.isNumber("turnover", "Khách hàng không được bỏ trống"),
    ]);
}

const field = {
    buyer_name: "",
    buyer_phone: "",
    customer_id: "",
    turnover: "",
    consultant_id: "",
    status: 0,
    seller_name: ""
}


export { field };

export default SaveResultEventValidate;