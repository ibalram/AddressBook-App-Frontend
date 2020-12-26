import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AddressBookSerivce from '../../services/addressbook-service';
import './home.scss';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            personArray: []
        }
        this.addressBookService = new AddressBookSerivce();
    }
    componentDidMount(){
        this.getAllPersonDetails();
    }
    getAllPersonDetails(){
        this.addressBookService.getAllPersons().then(data=>{
            // this.setState({personArray: data.data});
            this.setState({personArray: data.data.data});
        }).catch(err => alert(err));
    }
    remove = (id)=>{
        if (window.confirm("Are you sure to delete it? It is irreversible process.")){
            this.addressBookService.deletePersonDetails(id).then(data=>{
                alert("Success: Deleted Successfully")
                window.location.reload();
            }).catch(err=>alert(err));
        }
    }
    render(){
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
                <div className="main-content">
                    <div className="header-content">
                        <div className="person-detail-text">
                            Person Details <div className='person-count'>{this.state.personArray.length}</div>
                        </div>
                        <a href="/person-form" className="add-button">
                            <img alt="" src='/assets/icons/add-24px.svg' />Add Person</a>
                    </div>
                    <div className="table-main">
                        <table id="display" className="table">
                            <thead>
                                <tr className='table-head'>
                                    <td></td>
                                    <th>Fullname</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip Code</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.personArray&&this.state.personArray.map(person=>(
                                    <tr className='table-row' key={person.id}>
                                        <td></td>
                                        <td>{person.fullName}</td>
                                        <td>{person.address}</td>
                                        <td>{person.city}</td>
                                        <td>{person.state}</td>
                                        <td>{person.zip}</td>
                                        <td>{person.phoneNumber}</td>
                                        <td>
                                            <img id={person.id} style={{marginRight: '10px'}} className="delete-icon" onClick={()=>this.remove(person.id)} src="/assets/icons/delete-black-18dp.svg" alt="delete" />
                                            <Link to={{
                                                pathname: '/person-form',
                                                state: ["update", person]
                                            }}><img id={person.id} style={{marginRight: '10px'}} className="edit-icon" src="/assets/icons/create-black-18dp.svg" alt="edit" /></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);