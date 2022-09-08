import React from "react";
import Navbar from "./Navbar";
import ProductBuy from "./ProductBuy";
import ProductCard from "./ProductCard";
import CommerceService from "../services";
import {userList} from '../accounts';
import LogIn from "./LogIn";
import CartPage from "./CartPage";
import Shipping from "./Shipping";
import Confirmation from "./Confirmation";
const commerce = new CommerceService();


class Homepage extends React.Component {
    state = {
        details: [],
        error: false,
        loading: false,
        page: null,
        cartItems: 0,
        modal: null,
        isAccount: false,
        greeting: 'Sign Up/Log In',
        match: null,
        errorMessage: null,
    }
  
    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            console.log(res);
            if(res && res.response.ok) {
                this.setState({
                    details: res.details,
                    loading: false,  
                    screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap:'1rem', marginTop: '1rem', width: '100vw'}}>
                                {!this.state.loading ? this.state.details
                                    .filter(product => {return product.category === this.state.page || this.state.page === null || product.category.toLowerCase().includes(this.state.page) || product.title.toLowerCase().includes(this.state.page)})
                                    .map(item => (
                                            <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                        ))
                                : <div style={{color: 'white', backgroundColor: 'var(--Color-Three)'}}>Loading...</div>
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
        this.setState({screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap:'1rem', marginTop: '1rem', width: '100vw'}}>
                                        {!this.state.loading ? this.state.details
                                            .filter(product => {return product.category === value || value === null || product.category.toLowerCase().includes(value.toLowerCase()) || product.title.toLowerCase().includes(value.toLowerCase())})
                                            .map(item => (
                                                    <ProductCard buyProduct={this.buyProduct} key={item.Id} details={item}/>
                                                ))
                                        : <div style={{color: 'white', backgroundColor: 'var(--Color-Three)'}}>Loading...</div>
                                        }
                               </div>});
    }

    buyProduct = (details) => {
       this.setState({screen: <ProductBuy updateCartItems={this.updateCartItems} commerce={commerce} changeQuantity={this.changeQuantity}  details={details}/>});
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
        if(this.state.isAccount) {
            this.setState({screen: <CartPage shippingClick={this.shippingClick} updateCartItems={this.updateCartItems} commerce={commerce}/>});
        }
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
        const {screen, cartItems, modal, greeting, errorMessage} = this.state;

        return(
            <div style={{backgroundColor: 'var(--Color-One)'}} className="home-page">
                <Navbar greeting={greeting} cartClick={this.cartClick} toLogIn={this.toLogin} cartItems={cartItems}/>
                <div>
                    <button type="button" value="Watches" onClick={(e) => this.filterContainer(e)}>Watches</button>
                    <button type="button" value="Clocks" onClick={(e) => this.filterContainer(e)}>Clocks</button>
                    <button type="button" value="Necklaces" onClick={(e) => this.filterContainer(e)}>Necklaces</button>
                    <button type="button" value="Shoes" onClick={(e) => this.filterContainer(e)}>Shoes</button>
                    <button type="button" value="Instruments" onClick={(e) => this.filterContainer(e)}>Instruments</button>
                    <input onChange={(e) => this.filterContainer(e)} type="text"/><br/>           
                </div> 
                <>{modal}</>
                <div style={{width: '10rem', height: '2rem', color: 'var(--Color-Two)', position: 'fixed', top: '20rem', color: 'var(--Color-Five)'}}>{errorMessage}</div>           
                <>{screen}</>
            </div>
        );
    }
}

export default Homepage;