import { axiosInstances } from "./apiInstance";
//user registration 
export const registerUser = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//user login 
export const loginUser = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}