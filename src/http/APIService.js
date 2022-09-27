import axios from 'axios'
const API_URL = "https://movie-vue3.herokuapp.com/";/*"https://movies-groyce.pythonanywhere.com/";  /*"http://127.0.0.1:8000/"; */

export class APIService {
    constructor() {
  
    }

    getMovie(param_pk) {
      const url = `${API_URL}api/movies/${param_pk}`;
      let jwtToken = localStorage.getItem('token');
      console.log(":::jwtToken:::::"+jwtToken);
      const headers = {Authorization: `jwt ${jwtToken}`};
      return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
    }

    getMovieList() {
        const url = `${API_URL}api/movies/`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::"+jwtToken);
        const headers = {Authorization: `jwt ${jwtToken}`};
        return axios.get(url, {headers: headers});
      }

      addNewMovie(movie){
        const url = `${API_URL}api/movies/`;
        let jwtToken = localStorage.getItem('token');
        const headers = {Authorization: `jwt ${jwtToken}`};
        return axios.post(url, movie, {headers: headers});
      }
    
      updateMovie(movie){
        const url = `${API_URL}api/movies/${movie.pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = {Authorization: `jwt ${jwtToken}`};
        return axios.put(url, movie, {headers: headers});
      }
    
      deleteMovie(movie_Pk){
        const url = `${API_URL}api/movies/${movie_Pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = {Authorization: `jwt ${jwtToken}`};
        return axios.delete(url, {headers: headers});
      }

      authenticateLogin(credentials) {
        const url = `${API_URL}auth/`;
        return axios.post(url, credentials);
      }

      registerUser(credentials) {
        console.log(API_URL)
        const url = `${API_URL}register/`;
        credentials.customusername = credentials.username
        return axios.post(url, credentials);
      }
    }
