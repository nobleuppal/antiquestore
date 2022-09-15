import React, {useEffect} from "react";
import Navbar from "./Navbar";
import ProductBuy from "./ProductBuy";
import ProductCard from "./ProductCard";
import CommerceService from "../services";
import {userList} from '../accounts';
import LogIn from "./LogIn";
import CartPage from "./CartPage";
import Shipping from "./Shipping";
import Confirmation from "./Confirmation";
import '../stylesheets/storecontainer.css';
import searchLogo from '../assets/search.svg';
import flowersPhoto from '../assets/flowers.png';
const commerce = new CommerceService();


class StoreContainer extends React.Component {
    constructor() {
        super();
        this.lastDigits = null;
        this.page = null;
        this.productDetails = null;
    }
    state = {
        details: [],
        error: false,
        loading: false,
        cartItems: 0,
        modal: null,
        isAccount: false,
        greeting: 'Account',
        match: null,
        errorMessage: null,
        screenOne: 'homeHeader',
        screenTwo: 'productNav',
        screenThree: 'productCtn',
    }

    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            console.log(res);
            console.log(res.response.ok);
            if(res && res.response.ok) {
                this.setState({
                    details: res.details,
                    loading: false,           
                    search: <img onClick={() => this.getBar()} src={searchLogo} alt="search"/>,           
                });
            } else {
                this.setState({loading: false});
            }
        }, (error) => {
            this.setState(({
                loading: false,
                error: true,
            }));
        });
    }

    filterContainer = ({target: {value}}) => {
        this.page = value.toLowerCase();
        this.setState({screenThree: 'productCtn'});
    }

    buyProduct = (details) => {
       this.productDetails = details; 
       this.setState({screenTwo: null});
       this.setState({screenThree: null});
       this.setState({screenOne: 'productBuy'});
    }

    toLogin = () => {
        if (this.state.greeting.includes('Welcome')) {
            this.setState({modal: null});
        }
        else if(this.state.modal === null) {
            this.setState({modal: 'logIn'});
        }
        else {
            this.setState({modal: null});
        }
    }

    toHome = () => {   
        this.setState({screenOne: 'homeHeader'});
        this.setState({screenThree: 'productCtn'});
        this.setState({screenTwo: 'productNav'});
    }            

    updateCartItems = (totalItems) => {
        this.setState({cartItems: totalItems});
    }

    updateAccounts = (first, last, phone, email, password, confirmPass, e) => {
        e.preventDefault();
        if(password === confirmPass) {
            userList.push({first: first, last: last, phone: phone, email: email, password: password});
            this.setState({match: null});
        }
        else if(password !== confirmPass) {
            this.setState({match: "Passwords don't Match"});
        }
    }

    checkAccounts = (email, password, e) => {
        e.preventDefault();
        const user = userList.find( user => (user.email === email && user.password === password));
        if(user !== undefined) {
            this.setState({isAccount: true});
            this.setState({greeting: `Welcome ${user.first}!`});
        }
    }

    cartClick = () => {
        this.setState({screenTwo: null});
        this.setState({screenOne: 'cartPage'});
        this.setState({screenThree: null});        
    }

    shippingClick = () => {
        this.setState({screenOne: 'shipping'});
    }

    confirmClick = (error, expError, cardError, lastDigits) => {
        if(!error && !expError && !cardError) {
            this.lastDigits = lastDigits;
            this.setState({screenOne: 'confirmation'});
            this.setState({errorMessage: null});
        }
        else {
            this.setState({errorMessage: 'Error: 1 or more fields are not filled correctly'});
        }
    }

    render() {                 
        const {cartItems, greeting, errorMessage, screenTwo, screenOne, screenThree, modal} = this.state;

        let screenOneDisplay;
        let screenTwoDisplay;
        let screenThreeDisplay;
        let modalDisplay;

        if(screenThree === 'productCtn') {
            screenThreeDisplay = <div className="product-ctn">{
                                        !this.state.loading ? this.state.details
                                        .filter(product => {return product.category === this.page || this.page === 'all' || this.page === null || product.category.toLowerCase().includes(this.page) || product.title.toLowerCase().includes(this.page)})
                                        .map(item => (
                                                <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                            ))
                                        : <div className="loading">Loading...</div>
                                    }
                                 </div>
        }
        else if (screenThree === null) {
            screenThreeDisplay = null;
        }

        if(screenTwo === 'productNav') {
            screenTwoDisplay =  <div className="categories">
                                    <div>Products</div>
                                    <div>
                                        <div className="search-wrp">
                                            <input onChange={(e) => this.filterContainer(e)} type="text"/>
                                        </div> 
                                        <button type="button" value="all" onClick={(e) => this.filterContainer(e)}>All</button>
                                        <button type="button" value="Watches" onClick={(e) => this.filterContainer(e)}>Watches</button>
                                        <button type="button" value="Clocks" onClick={(e) => this.filterContainer(e)}>Clocks</button>
                                        <button type="button" value="Necklaces" onClick={(e) => this.filterContainer(e)}>Necklaces</button>
                                        <button type="button" value="Shoes" onClick={(e) => this.filterContainer(e)}>Shoes</button>
                                        <button type="button" value="Instruments" onClick={(e) => this.filterContainer(e)}>Instruments</button>                      
                                    </div>        
                                </div>
        }
        else if (screenTwo === null) {
            screenTwoDisplay = null;
        }
          
        if(screenOne === 'homeHeader') {        
            screenOneDisplay = <div className="home-header">
                                    <div>
                                        <p>THESE ARE VINTAGE ITEMS</p>
                                        <h3>POSSESSED BY THE BIGGEST <br/> NAMES IN HISTORY</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/> Fusce id est gravida</p>
                                        <div className="dummy-btn-ctn">
                                            <button>Buy Now</button>
                                            <button>Read More</button>
                                        </div>
                                    </div>
                                    <img src={flowersPhoto} alt="antique-stock"/>
                                </div>
        }
        else if(screenOne === 'productBuy') {
            screenOneDisplay = <ProductBuy updateCartItems={this.updateCartItems} commerce={commerce} changeQuantity={this.changeQuantity}  details={this.productDetails}/>
        }
        else if(screenOne === 'cartPage') {
            screenOneDisplay = <CartPage shippingClick={this.shippingClick} updateCartItems={this.updateCartItems} commerce={commerce}/>
        }
        else if(screenOne === 'shipping') {
            screenOneDisplay = <Shipping confirmClick={this.confirmClick} commerce={commerce}/>
        }
        else if (screenOne === 'confirmation') {
            screenOneDisplay = <Confirmation lastDigits={this.lastDigits}/>
        }

        if(modal === 'logIn') {
            modalDisplay = <LogIn match={this.state.match} updateAccounts={this.updateAccounts} checkAccounts={this.checkAccounts} toLogIn={this.toLogin}/>
        }
        else if(modal === null) {
            modalDisplay = null;
        }
                       
        return(
            <div className="store-container">
                <Navbar toHome={this.toHome} greeting={greeting} cartClick={this.cartClick} toLogIn={this.toLogin} cartItems={cartItems}/>    
                <>{screenOneDisplay}</>       
                <>{modalDisplay}</>
                <div className="error-message">{errorMessage}</div>           
                <>{screenTwoDisplay}</>
                <>{screenThreeDisplay}</>
            </div>
        );
    }
}

export default StoreContainer;