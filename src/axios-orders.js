import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-7b7a2.firebaseio.com'
    // baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAFi-Tm603OZoRjGbMJiEXj4gZhbvfacjs'
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default instance;