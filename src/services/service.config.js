import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:5005/api'
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