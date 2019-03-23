import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-builder-b62b2.firebaseio.com/'
});

export default instance;