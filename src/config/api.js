import axios from "axios";
import store from "../store";


const GET = async (url, params) => {
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authServices.user.accessToken}`;
    return axios.get(url, { params }).then(response => response.data);
}

const POST = async (url, data, isAuthenticate = true) => {
    if(isAuthenticate){
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authServices.user.accessToken}`;
    }
    // const response = await axios.post(url, data);
    return axios.post(url, data).then(response => response.data);
}

const PUT = async (url, data) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authServices.user.accessToken}`;
    return axios.put(url, data).then(response => response.data);
}

const DELETE = async (url) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authServices.user.accessToken}`;
    return axios.delete(url).then(response => response.data);
}

const api = {
    GET,
    POST,
    PUT,
    DELETE,
}

export default api;