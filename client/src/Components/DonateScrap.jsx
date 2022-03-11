import axios from 'axios';
import React,{useContext, useState} from 'react'
import { useHistory } from 'react-router';
import { userContext } from '../App';

function DonateScrap() {
    const history = useHistory()
    const {userdetails} = useContext(userContext)
    const [url,seturl]=useState('');
    const [donate_to,setDonate]=useState('')
    const [location,setlocation]=useState('')
    const [phone,setphone] = useState()
    const [date,setdate]=useState('')
    const submit=async(e)=>{
        e.preventDefault();
        if(url==='' || donate_to==='' || location==='' || date==='' || phone===null){
            alert('Empty Inputs');
            return;
        }
        const donate_item = await axios.post('https://bhangaar-api.herokuapp.com/donate_scrap',{url,donate_to:"NGO",location,phone,date,email:userdetails.email})
        if(donate_item.status === 201)
        {
            alert('Thanks for Donating');
            history.push('/')
        }
    }
    return (
        <div className="wrapper">
            <div className="main-form">
                <div className="input-field">
                    <h3>Srcap Photo URL</h3>
                    <input type="text" value={url} onChange={e=>seturl(e.target.value)} />
                </div>
                {/* <div className="input-field">
                    <h3>Donate to (NGO Name):</h3>
                    <input type="text" value={donate_to} onChange={e=>setDonate(e.target.value)} />
                </div> */}
                <div className="input-field">
                    <h3>Your Location</h3>
                    <input type="text" value={location} onChange={e=>setlocation(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Phone Number</h3>
                    <input type="text" value={phone} onChange={e=>setphone(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Date to Pick</h3>
                    <input type="date" required="true" value={date} onChange={e=>setdate(e.target.value)} />
                </div>
                
                <button className="primary-button" onClick={submit} >Donate</button>
            </div>
        </div>

    )
}

export default DonateScrap
