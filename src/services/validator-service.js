export default class Validator{
    namePattern = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
    addressPattern = RegExp("^[a-zA-Z0-9-, ]+$");
    phonePattern = RegExp("(^[0-9]{1,}[ ][1-9][0-9]{9}$)|(^[1-9][0-9]{9}$)");
    zipPattern = RegExp("^[0-9]{6,}$");

    validateName(name){
        return this.namePattern.test(name)?"":"Name is Invalid";
    }
    validateAddress(address){
        return this.addressPattern.test(address)?"":"Address is Invalid";
    }
    validatePhoneNumber(phoneNumber){
        return this.phonePattern.test(phoneNumber)?"":"Phone number is Invalid";
    }
    validateZip(zip){
        return this.zipPattern.test(zip)?"":"Zip code is Invalid";
    }
    validate(name, value){
        switch(name){
            case "fullName":
                return this.validateName(value);
            case "address":
                return this.validateAddress(value);
            case "phoneNumber":
                 return this.validatePhoneNumber(value);
            case "zip":
                return this.validateZip(value);
            default:
                return value.length>0?'':name+" is required field";
        }
    }
}
// export default new Validator();