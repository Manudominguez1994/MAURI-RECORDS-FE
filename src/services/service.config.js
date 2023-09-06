import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

// configurar que en TODAS las llamadas alBE busquemos en el navegador el token y lo enviemos
service.interceptors.request.use((config) => {

    // buscar el token
    const storedToken = localStorage.getItem("authToken")
   
    // añadirlo al config

    if (storedToken) {
        config.headers.authorization = `Bearer ${storedToken}`
    }

   
    // retornar el config

    return config;
}
)



export default service;