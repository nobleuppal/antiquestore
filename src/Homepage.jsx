import React from "react";
import Navbar from "./Navbar";
import ProductBuy from "./ProductBuy";
import ProductCard from "./ProductCard";
import CommerceService from "./services";
import {userList} from './accounts';
import LogIn from "./LogIn";
import CartPage from "./CartPage";
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
        logged: 'Sign Up/Log In',
        match: null,
    }
  
    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            if(res && res.response.ok) {
                this.setState({
                    details: res.details,
                    loading: false,  
                    screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap:'1rem', marginTop: '18rem', width: '100vw'}}>
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
            console.log(error);
            this.setState(({
                loading: false,
                error: true,
            }));
        });
    }

    filterContainer = ({target: {value}}) => {
        this.setState({page: value.toLowerCase()});
        this.setState({screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap:'1rem', marginTop: '18rem', width: '100vw'}}>
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
        if (this.state.logged.includes('Welcome')) {
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
        console.log(userList);
        const user = userList.find( user => (user.email === email && user.password === password));
        if(user !== undefined) {
            this.setState({isAccount: true});
            this.setState({logged: `Welcome ${user.first}!`});
        }
    }

    cartClick = () => {
        if(this.state.isAccount) {
            this.setState({screen: <CartPage/>});
        }
    }

    render() {                 
        const {screen, cartItems, modal, logged} = this.state;

        return(
            <div style={{backgroundColor: 'var(--Color-One)'}} className="home-page">
                <Navbar logged={logged} cartClick={this.cartClick} toLogIn={this.toLogin} cartItems={cartItems} filterContainer={this.filterContainer}/>
                <>{modal}</>
                <>{screen}</>
            </div>
        );
    }
}

export default Homepage;