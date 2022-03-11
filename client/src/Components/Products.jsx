import React, { useState, useContext, useEffect } from 'react'
import "../style.css"
import axios from 'axios'
import { userContext } from '../App'


function Products({ item }) {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        await axios.get('http://localhost:5000/get-products')
            .then(res => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                alert(err.message);
            });

    }

    useEffect(() => {
        getProducts();
    }, [])

    const { userDetails } = useContext(userContext)
    const buy = async (item) => {
        const url = item.url;
        const title = item.name;
        const desc = item.description;
        const price = item.total;
        const getResult = window.confirm('Are you sure want to buy this?');
        if (getResult) {
            const donate_item = await axios.post('https://bhangaar-api.herokuapp.com/donate_scrap', { url, donate_to: title, location: desc, phone: 0, date: price, email: userDetails.email })
            if (donate_item.status === 201) {
                alert('Thanks for Buying, your order is being placed!');
            }
        }
    }
    return (
        <>
            {
                products.map(item => (
                    <div className="product_card">
                        <img src={item.url} alt="" />
                        <div className="down">
                            <h3 className="prod_title">{item.name}</h3>
                            <p className="prod_desc">{item.description}</p>
                            <div className="wrap">
                                <h2 className="prod_price">{item.total} Rs.</h2>
                                <button className="secondary-button-two" onClick={() => { buy(item) }}>Buy</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Products;