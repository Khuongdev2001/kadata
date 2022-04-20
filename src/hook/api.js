import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")) : new Object;
export const baseURL = `http://localhost:8080/v1`;

const useAxiosUnAuth = axios.create(
    {
        baseURL,
        headers: { Accept: "application/json" }
    }
);

const useAxiosAuth = axios.create(({
    baseURL,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`
    }
}));

const useAxiosAuthFormData = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`,
        "Content-Type": "multipart/form-data"
    }
});

export { 
    useAxiosUnAuth,
    useAxiosAuth,
    useAxiosAuthFormData
}