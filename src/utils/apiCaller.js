import axios from 'axios';
import Storage from '@/utils/storage'
import Config from '@/configs'


const callAPI = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: {
            "authorization": `bearer ${Storage.get('ACCESS_TOKEN')}`,
            "accept": "application/json",
        }
    })
    // .then(data => {
    //         return data;
    // })
    // .catch(err => {
    //     console.log(err);
    // });
}

export default callAPI;