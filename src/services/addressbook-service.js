import config from '../config/config';
import axiosService from './axios-service';

export default class AddressBookSerivce{
    baseUrl = config.baseUrl;
    addPerson(data){
        return axiosService.postService(`${this.baseUrl}/create`, data);
    }
    getAllPersons(){
        return axiosService.getService(`${this.baseUrl}/`);
    }
    deletePersonDetails(id){
        return axiosService.deleteService(`${this.baseUrl}/delete/${id}`);
    }
    updatePersonDetails(id, data){
        return axiosService.updateService(`${this.baseUrl}/update/${id}`, data);
    }
}