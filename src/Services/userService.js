
import AxiosService from "C:/ReactProject2/fundoonotes/src/Services/axiosService.js";
const axios = new AxiosService();

export default class services {
  baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api";
  Registration = (data) => {
    return axios.postMethod(`${this.baseUrl}/user/userSignUp`, data);
  };
  login = (data) => {
    return axios.postMethod(`${this.baseUrl}/user/login`, data);
  };
  forgotPassword = (data) => {
    return axios.postMethod(`${this.baseUrl}/user/reset`, data);
  }; 
  resetPassword = (data, token) => {
    return axios.postMethod(`${this.baseUrl}/user/reset-password`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  };
    

}
