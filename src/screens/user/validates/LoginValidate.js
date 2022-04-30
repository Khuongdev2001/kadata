import useValidator from "../../../hook/validate"
function LoginValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("email", "Email không được bỏ trống"),
        useValidator.isEmail("email", "Không phải định dạng Email"),
        useValidator.isRequired("password", "Mật Khẩu không được bỏ trống"),
    ]);
}

const field = {
    email: "kadita@gmail.com",
    password: ""
};

export { field };

export default LoginValidate;