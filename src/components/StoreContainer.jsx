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
    state = {
        details: [],
        error: false,
        loading: false,
        page: null,
        cartItems: 0,
        modal: null,
        isAccount: false,
        greeting: 'Account',
        match: null,
        errorMessage: null,
        pageHeader: <div className="nav-bar-bottom">
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
                    </div>,
    }


    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            console.log(res);
            if(res && res.response.ok) {
                this.setState({
                    details: res.details,
                    loading: false,           
                    search: <img onClick={() => this.getBar()} src={searchLogo} alt="search"/>,
                    productNav: <div className="categories">
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
                                </div>, 
                    screen: <div className="product-ctn">
                                {!this.state.loading ? this.state.details
                                    .filter(product => {return product.category === this.state.page || this.state.page === null || product.category.toLowerCase().includes(this.state.page) || product.title.toLowerCase().includes(this.state.page)})
                                    .map(item => (
                                            <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                        ))
                                    : <div className="loading">Loading...</div>
                                }
                            </div>
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
        this.setState({page: value.toLowerCase()});
        this.setState({screen: <div className="product-ctn">
                                        {!this.state.loading ? this.state.details
                                            .filter(product => {return product.category === value || value === 'all' || value === null || product.category.toLowerCase().includes(value.toLowerCase()) || product.title.toLowerCase().includes(value.toLowerCase())})
                                            .map(item => (
                                                    <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                                ))
                                        : <div className="loading">Loading...</div>
                                        }
                               </div>});
    }

    buyProduct = (details) => {
       this.setState({productNav: null});
       this.setState({screen: <ProductBuy updateCartItems={this.updateCartItems} commerce={commerce} changeQuantity={this.changeQuantity}  details={details}/>});
       this.setState({pageHeader: null});
    }

    toLogin = () => {
        if (this.state.greeting.includes('Welcome')) {
            this.setState({modal: null});
        }
        else if(this.state.modal === null) {
            this.setState({modal: <LogIn match={this.state.match} updateAccounts={this.updateAccounts} checkAccounts={this.checkAccounts} toLogIn={this.toLogin}/>});
        }
        else {
            this.setState({modal: null});
        }
    }

    toHome = () => {   
        this.setState({pageHeader: <div className="nav-bar-bottom">
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
                                    </div>})

        this.setState({screen: <div className="product-ctn">
                                    {!this.state.loading ? this.state.details
                                        .filter(product => {return product.category === this.state.page || this.state.page === null || product.category.toLowerCase().includes(this.state.page) || product.title.toLowerCase().includes(this.state.page)})
                                        .map(item => (
                                                <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                            ))
                                        : <div className="loading">Loading...</div>
                                    }
                                </div>})

        this.setState({productNav: <div className="categories">
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
                                    </div>})
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
        this.setState({productNav: null});
        this.setState({pageHeader: null});
        this.setState({screen: <CartPage shippingClick={this.shippingClick} updateCartItems={this.updateCartItems} commerce={commerce}/>});        
    }

    shippingClick = () => {
        this.setState({screen: <Shipping confirmClick={this.confirmClick} commerce={commerce}/>})
    }

    confirmClick = (error, expError, cardError, lastDigits) => {
        if(!error && !expError && !cardError) {
            this.setState({screen: <Confirmation lastDigits={lastDigits}/>});
            this.setState({errorMessage: null});
        }
        else {
            this.setState({errorMessage: 'Error: 1 or more fields are not filled correctly'});
        }
    }

    render() {                 
        const {screen, cartItems, modal, greeting, errorMessage, productNav, pageHeader} = this.state;

        return(
            <div className="store-container">
                <Navbar toHome={this.toHome} newPageHeader={pageHeader} greeting={greeting} cartClick={this.cartClick} toLogIn={this.toLogin} cartItems={cartItems}/>    
                <>{productNav}</>       
                <>{modal}</>
                <div className="error-message">{errorMessage}</div>           
                <>{screen}</>
            </div>
        );
    }
}

export default StoreContainer;