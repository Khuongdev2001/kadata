const addUser = function (payload) {
    return {
        type: "ADD_USER",
        payload
    }
}

const updateUser = function (payload) {
    return {
        type: "UPDATE_USER",
        payload
    }
};

export { addUser,updateUser };