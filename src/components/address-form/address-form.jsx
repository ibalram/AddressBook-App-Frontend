import { useState } from "react";
import { Link, withRouter } from "react-router-dom"
import './address-form.scss';

const AddressForm = (props) => {
    const initialValue = {
        fullName: '',
        phoneNumber: '',
        address: '',
        city:'',
        state: '',
        zip: ''
    }
    const [formValue, setForm] = useState(initialValue)

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value});
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
                <form className="form">
                    <div className="form-head">PERSON ADDRESS FORM</div>
                    <div className="form-body">
                        <div className='row-content'>
                            <label>Full Name</label>
                            <input type="text" name="fullName" id="fullName" defaultValue={formValue.fullName} onChange={changeValue}></input>
                        </div>

                        <div className='row-content'>
                            <label>Phone Number</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" defaultValue={formValue.phoneNumber} onChange={changeValue}></input>
                        </div>

                        <div className='row-content'>
                            <label>Address</label>
                            <textarea type="text" name="address" id="address" defaultValue={formValue.address} onChange={changeValue}></textarea>
                        </div>

                        <div className='row-content row-col-content'>
                            <div>
                                <label>City</label>
                                <select name='city' defaultValue='' onChange={changeValue}>
                                    <option value="" hidden>Select City</option>
                                    <option value='Jaipur'>Jaipur</option>
                                    <option value='Delhi'>Delhi</option>
                                </select>
                            </div>
                            <div>
                                <label>State</label>
                                <select name= 'state' defaultValue='' onChange={changeValue}>
                                    <option value="" hidden>Select State</option>
                                    <option value='Rajasthan'>Rajasthan</option>
                                    <option value='Delhi'>Delhi</option>
                                </select>
                            </div>
                            <div>
                                <label>Zip Code</label>
                                <input name='zip' type="text" defaultValue={formValue.zip} onChange={changeValue}></input>
                            </div>
                        </div>
                        <div className="button-parent">
                            <div className="submit-reset-button">
                                <button type="submit" className="button add-button">Add</button>
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