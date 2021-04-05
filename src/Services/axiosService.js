import axios from 'axios'

export default class AxiosService{

    postMethod=(url,data,isHeaderRequired = false)=>{
/*         console.log(url);
 */  return axios.post(url,data,isHeaderRequired);
    }  
  
    
     
}