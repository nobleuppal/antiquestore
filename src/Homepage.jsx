import React from "react";
import Navbar from "./Navbar";
import Commerce from '@chec/commerce.js';
import { COMMERCE_PUB_API } from "./constants";


class Homepage extends React.Component {
    constructor() {
        super()
        this.commerce = new Commerce(COMMERCE_PUB_API);
    }


    render() {

        return(
            <div className="home-page">
                <Navbar/>
                {this.commerce.products.list().then((product) => console.log(product))}
            </div>
        );
    }
}

export default Homepage;