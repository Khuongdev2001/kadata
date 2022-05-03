import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")) : new Object;
export const baseURL = `https://app-a00f12b9-5a6a-4bbb-b4ba-832c3d5dab42.cleverapps.io/v1`;
// export const baseURL = `http://localhost/v1`;

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