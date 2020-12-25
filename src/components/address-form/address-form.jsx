import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AddressBookService from '../../services/addressbook-service';
import './address-form.scss';
import Validator from '../../services/validator-service';
import stateCityService from '../../services/state-city-service';

const AddressForm = (props) => {
    const addressBookService = new AddressBookService();
    const validator = new Validator();
    let initialValue = {
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
        isUpdate: false,
        statesObject: stateCityService.getStatesObject(),
        cities: []
    }

    if (props.location.state && props.location.state[0]==='update'){
        initialValue = {...initialValue, ...props.location.state[1], isUpdate: true, cities: initialValue.statesObject[props.location.state[1].state]};
    };

    const [formValue, setForm] = useState(initialValue)

    const changeValue = (event) => {
        const {name, value} = event.target;
        let error=formValue.error;
        error = {...error,[name]:validator.validate(name, value)};
        setForm({...formValue, [name]: value, error: error});
    }
    const selectStateHandler=(event)=>{
		setForm({...formValue, state: event.target.value, cities : formValue.statesObject[event.target.value]});
    }
    const selectCityHandler=(event)=>{
        setForm({...formValue, city: event.target.value});
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
        const ls = error;
        let isError = false;
        Object.keys(ls).forEach(
            (val) => error={...error, [val]:validator.validate(val, formValue[val])}
        );
        Object.values(error).forEach(
            (val) => isError=isError||val.length>0
        );
        await setForm({...formValue, error:error});
        return isError;
    }
    const save = async (event) => {
        event.preventDefault();
        if(await validData()){
            alert("Error: Invalid form values");
            console.log('Error', formValue);
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
        if (formValue.isUpdate){
            addressBookService.updatePersonDetails(formValue.id, object).then(data=>{
                alert("Success: Person details update successfully");
                console.log("Person details updated successfully");
                props.history.push('');
            }).catch(err => console.log(err));
        }
        else{
            addressBookService.addPerson(object).then(data =>{
            alert("Success: Person added successfully");
            console.log("Person added successfully");
            props.history.push('');
            }).catch(err => console.log(err));
        }
    }

    const reset = () =>{
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        // console.log(formValue);
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
                <form className="form" onSubmit={save} onReset={reset} autoComplete="off">
                    <div className="form-head">
                        <div>PERSON ADDRESS FORM</div>
                        <div className="cancel-button"><Link to='/'><img src="/assets/icons/cancel.png" /></Link></div>
                    </div>
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
                                <label>State</label>
                                <select name= 'state' defaultValue={formValue.state} onChange={selectStateHandler}>
                                    <option value="" hidden>Select State</option>
                                    {Object.keys(formValue.statesObject).map(state=><option key={state} value={state}>{state}</option>)}
                                </select>
                                {formValue.error.state && <div className="error">{formValue.error.state}</div>}
                            </div>

                            <div>
                                <label>City</label>
                                <select name='city' defaultValue={formValue.city} onChange={selectCityHandler}>
                                    <option value="" hidden>Select City</option>
                                    {formValue.cities.map(city=><option key={city} value={city}>{city}</option>)}
                                </select>
                                {formValue.error.city && <div className="error">{formValue.error.city}</div>}
                            </div>
                            
                            <div>
                                <label>Zip Code</label>
                                <input name='zip' type="text" defaultValue={formValue.zip} onChange={changeValue}></input>
                                { formValue.error.zip && <div className="error">{formValue.error.zip}</div>}
                            </div>
                        </div>
                        <div className="button-parent">
                            <div className="submit-reset-button">
                                <button type="submit" disabled={formValue.submitDisable} className="button add-button" >{formValue.isUpdate?'Update':'Add'}</button>
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