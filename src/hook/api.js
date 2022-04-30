import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")) : new Object;
export const baseURL = `http://app-9bbddfec-10f7-4e5c-9997-e3710b6501ab.cleverapps.io//v1`;

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
        Authorization: `Bearer ${user.token}`
    }
}));

const useAxiosAuthFormData = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data"
    }
});

export { 
    useAxiosUnAuth,
    useAxiosAuth,
    useAxiosAuthFormData
}