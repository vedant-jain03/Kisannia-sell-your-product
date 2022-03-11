import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { userContext } from '../App'
import "../style.css"



function SellProduct() {

    const history = useHistory()
    const { userDetails } = useContext(userContext)
    const [url, setUrl] = useState('');
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState();
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')


    const submit = async (e) => {
        e.preventDefault();
        if (price === 0) {
            alert('Price should not be 0');
            return;
        }
        else if (url === '' || location === '' || phone === null || description === '' || name === '') {
            alert('Empty Inputs');
            return;
        }

        const sell_item = await axios.post('http://localhost:5000/sellProduct', { url: url, total: price, location, phone, description, name, email: userDetails.email });
        if (sell_item.status === "SUCCESS" || sell_item.data.status === "success") {
        }
        history.push('/products');
        alert(sell_item.message || sell_item.data.message);
    }
    return (
        <div className="wrapper">
            <div className="main-form">
                <div className="input-field">
                    <h3>Product Photo URL</h3>
                    <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Price</h3>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Name</h3>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Your Location</h3>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Phone Number</h3>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="input-field">
                    <h3>Description</h3>
                    <input type="text" required="true" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button className="primary-button" onClick={submit} >Confirm</button>
            </div>
        </div >

    )
}

export default SellProduct
