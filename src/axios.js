import axios from 'axios';

//base url to make requests
const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3"
});
//instance.get('/something') will make a get request to address: baseURL + '/something' or http://api.themoviedb.org/3/something
export default instance;
//1 file can have only 1 default export