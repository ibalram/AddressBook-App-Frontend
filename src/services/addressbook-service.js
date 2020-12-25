import config from '../config/config';
import axiosService from './axios-service';

export default class AddressBookSerivce{
    baseUrl = config.baseUrl;
    addPerson(data){
        return axiosService.postService(`${this.baseUrl}/addressbook`, data);
    }
    getAllPersons(){
        return axiosService.getService(`${this.baseUrl}/addressbook`);
    }
    deletePersonDetails(id){
        return axiosService.deleteService(`${this.baseUrl}/addressbook/${id}`);
    }
}