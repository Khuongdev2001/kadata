const loginUser = function (payload) {
    return {
        type: "LOGIN_USER",
        payload
    }
}

const logoutUser = function (payload) {
    return {
        type: "LOGOUT_USER",
        payload
    }
};

export { loginUser, logoutUser };