import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:  
    process.env.REACT_APP_API_URL ||   `http://${window.location.hostname}:5000/api`,
    // 'http://localhost:5000/api',
   
     headers: {
        'Content-Type': 'application/json'
    },
     timeout: 5000,

});
export default axiosInstance;