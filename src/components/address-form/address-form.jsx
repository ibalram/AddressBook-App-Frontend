import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AddressBookService from '../../services/addressbook-service';
import './address-form.scss';

const AddressForm = (props) => {
    const addressBookService = new AddressBookService();
    const initialValue = {
        fullName: '',
        phoneNumber: '',
        address: '',
        city:'',
        state: '',
        zip: '',
        error:{
            fullName: '',
            phoneNumber: '',
            address: '',
            city:'',
            state: '',
            zip: ''
        },
        id: '',
        isUpdate: false
    }
    const [formValue, setForm] = useState(initialValue)

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value});
    }

    const validData = async()=>{
        let error={
            fullName: '',
            phoneNumber: '',
            address: '',
            city:'',
            state: '',
            zip: ''
        }
        let isError = false;
        if (formValue.fullName.length<1){
            error.fullName='Name is required field';
            isError=true;
        }
        if (formValue.address.length<1){
            error.address='Address is required field';
            isError=true;
        }
        if (formValue.phoneNumber.length<1){
            error.phoneNumber='Phone number is required field';
            isError=true;
        }
        if (formValue.city.length<1){
            error.city='City is required field';
            isError=true;
        }
        if (formValue.state.length<1){
            error.state='State is required field';
            isError=true;
        }
        if (formValue.zip.length<1){
            error.zip='Zip code is required field';
            isError=true;
        }
        await setForm({...formValue, error:error})
        return isError;
    }
    const save = async (event) => {
        event.preventDefault();
        if(await validData()){
            console.log('error', formValue);
            return ;
        }
        let object ={
            fullName: formValue.fullName,
            address: formValue.address,
            phoneNumber: formValue.phoneNumber,
            city: formValue.city,
            state: formValue.state,
            zip: formValue.zip
        }
        addressBookService.addPerson(object).then(data =>{
            alert("Person added successfully");
            console.log("Person added successfully");
            props.history.push('');
        }).catch(err => console.log(err));
    }

    const reset = () =>{
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }
    return (
        <div className="body">
            <header className="header-content header">
                <a href='/'>
                <div className="logo">
                    <img src="/assets/logos/logo.png" alt='AddressBook App' />
                    <div>
                        <span className="logo-text address-text">ADDRESS</span><br/>
                        <span className="logo-text book-text">BOOK</span>
                    </div>
                </div>
                </a>
            </header>

            <div className="form-content">
                <form className="form" onSubmit={save} onReset={reset}>
                    <div className="form-head">PERSON ADDRESS FORM</div>
                    <div className="form-body">
                        <div className='row-content'>
                            <label>Full Name</label>
                            <input type="text" name="fullName" id="fullName" defaultValue={formValue.fullName} onChange={changeValue}></input>
                        </div>
                        <div className="error">{formValue.error.fullName}</div>

                        <div className='row-content'>
                            <label>Phone Number</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" defaultValue={formValue.phoneNumber} onChange={changeValue}></input>
                        </div>
                        <div className="error">{formValue.error.phoneNumber}</div>

                        <div className='row-content'>
                            <label>Address</label>
                            <textarea type="text" name="address" id="address" defaultValue={formValue.address} onChange={changeValue}></textarea>
                        </div>
                        <div className="error">{formValue.error.address}</div>

                        <div className='row-content row-col-content'>
                            <div>
                                <label>City</label>
                                <select name='city' defaultValue='' onChange={changeValue}>
                                    <option value="" hidden>Select City</option>
                                    <option value='Jaipur'>Jaipur</option>
                                    <option value='Delhi'>Delhi</option>
                                </select>
                                {formValue.error.city && <div className="error">{formValue.error.city}</div>}
                            </div>

                            <div>
                                <label>State</label>
                                <select name= 'state' defaultValue='' onChange={changeValue}>
                                    <option value="" hidden>Select State</option>
                                    <option value='Rajasthan'>Rajasthan</option>
                                    <option value='Delhi'>Delhi</option>
                                </select>
                                {formValue.error.state && <div className="error">{formValue.error.state}</div>}
                            </div>
                            
                            <div>
                                <label>Zip Code</label>
                                <input name='zip' type="text" defaultValue={formValue.zip} onChange={changeValue}></input>
                                { formValue.error.zip && <div className="error">{formValue.error.zip}</div>}
                            </div>
                        </div>
                        <div className="button-parent">
                            <div className="submit-reset-button">
                                <button type="submit" className="button add-button" >Add</button>
                                <button type="reset" className="button reset-button">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default withRouter(AddressForm);