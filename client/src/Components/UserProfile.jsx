import React, { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userContext } from "../App"
import axios from 'axios';

function UserProfile() {

    const { userDetails } = useContext(userContext);
    const [sell, setSell] = useState([]);
    const [donate, setDonate] = useState([]);

    const fetchSell = async () => {
        const sell_data = await axios.get(`http://localhost:5000/product/${userDetails.email}`);
        const data = await sell_data.data
        const final = await data.result
        setSell(final)
    }
    const fetchDonate = async () => {
        const donate_data = await axios.get(`http://localhost:5000/donated_scrap/${userDetails.email}`);
        const data = await donate_data.data;
        const final = await data.result
        setDonate(final)
    }

    useEffect(() => {
        fetchSell();
        fetchDonate();
    }, [])
    return (
        <div className="user-wrapper">
            <div className="profile-card" style={{ display: 'flex', alignItem: 'center', }}>
                <AccountCircleIcon />
                <div className="div">
                    <h3>{userDetails.name}'s Recent Transactions</h3>
                </div>
            </div>
            <div className="wrapper">
                <div className="transactions">
                    <center><h3>Transaction</h3></center>
                    {
                        (sell.length === 0) ? (
                            <h1><center>No Transaction's</center></h1>
                        ) : null
                    }
                    {
                        sell.map((item) => (
                            <div className={`transaction Sell ${item.status === 'Confirm' ? 'Confirm' : 'Pending'}`}>Order Placed of Rupees {item.total} to collect from {item.location} on {item.date} & <span>{item.status}</span></div>
                        ))
                    }
                </div>
                <div className="transactions">
                    <center><h3>Product Transaction</h3></center>
                    {
                        (donate.length === 0) ? (
                            <h1><center>No Transaction's</center></h1>
                        ) : null
                    }
                    {
                        donate.map((item) => (
                            <div className="transaction Donate">You purchased {item.donate_to} of Rupees {item.date} </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default UserProfile
