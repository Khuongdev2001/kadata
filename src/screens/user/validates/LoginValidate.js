import useValidator from "../../../hook/validate"
function LoginValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("email", "Email không được bỏ trống"),
        useValidator.isEmail("email", "Cấp Bậc không được bỏ trống"),
        useValidator.isRequired("password", "Mật Khẩu không được bỏ trống"),
    ]);
}

const field = {
    email: "",
    password: ""
};

export { field };

export default LoginValidate;