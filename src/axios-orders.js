import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-7b7a2.firebaseio.com'
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default instance;