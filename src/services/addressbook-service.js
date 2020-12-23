import config from '../config/config';
const axios = require('axios').default;

export default class AddressBookSerivce{
    baseUrl = config.baseUrl;
    addPerson(data){
        return axios.post(`${this.baseUrl}/addressbook`, data)
    }
}