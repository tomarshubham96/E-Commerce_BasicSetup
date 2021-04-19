import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Products, Navbar } from './Components';
import img1 from './images/shoes.png';
import img2 from './images/bags.png';
import img3 from './images/watches.png';

const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=b0c6e5c9a6ee677a4b58709ac603295f&symbols=USD,INR&format=1';

const dbproducts = [
    { id: 1, name: "Shoes", description: 'Running Shoes.', price: '5', currSymbol: '$', image: img1 },
    { id: 2, name: "Bags", description: 'Bags.', price: '10', currSymbol: '$', image: img2 },
    { id: 3, name: "Watchs", description: 'Watchs.', price: '15', currSymbol: '$', image: img3 }
];

const App = () => {
    const [products, setProducts] = useState(dbproducts);
    const [conversionRate, setConversionRate] = useState([]);

    const fetchConversionRate = async () => {
        try {
            const { data } = await axios.get(url);
            //await axios.get(url);
            setConversionRate(data.rates);          
        } catch (error) {
            console.log(error.message);
        }        
    };

    const handlePriceConversion = (type) => {
        switch (type) {
            case 'INR':
                products.map((product) => {
                   product.price = (product.price * (conversionRate.INR/conversionRate.USD)).toFixed(2);
                   product.currSymbol = '₹';
                })
                setProducts([...products]);
                break;
            case 'USD':
                products.map((product) => {
                    product.price = (product.price * (conversionRate.USD/conversionRate.INR)).toFixed(2);
                    product.currSymbol = '$';
                 })
                 setProducts([...products]);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchConversionRate();
    }, [])

    return (
        <div>
            <Navbar handlePriceConversion={handlePriceConversion}/>
            <Products products={products}/>
        </div>
    )
}

export default App;
