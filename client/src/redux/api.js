import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8800"});

// to add the token in our request header so that midddleware receive the token under authorization
API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
})

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createCafe = (cafeData) => API.post("/cafe", cafeData);
export const getCafes = () => API.get("/cafe");
export const getCafe = (id) => API.get(`/cafe/${id}`); // id -> cafe id
export const deleteCafe = (id) => API.delete(`/cafe/${id}`); // id -> cafe id
export const updateCafe = (updatedCafeData, id) => API.patch(`/cafe/${id}`, updatedCafeData);
export const getCafesByUser = (userId) => API.get(`/cafe/userCafes/${userId}`); // id -> user id