import React from "react";
import Navbar from "./Navbar";
import ProductBuy from "./ProductBuy";
import ProductCard from "./ProductCard";
import CommerceService from "./services";
const commerce = new CommerceService();

class Homepage extends React.Component {
    state = {
        details: [],
        detailsCart: [],
        error: false,
        loading: false,
        page: null,
    }
    
    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            if(res && res.response.ok) {
                this.setState({
                    detailsCart: res.detailsCart,
                    details: res.details,
                    loading: false,  
                    screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap:'1rem', marginTop: '1rem'}}>
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
        this.setState({screen: <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap:'1rem', marginTop: '1rem'}}>
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
       this.setState({screen: <ProductBuy commerce={commerce} detailsCart={this.state.detailsCart} changeQuantity={this.changeQuantity}  details={details}/>});
    }



    render() {                 
        const {screen, detailsCart} = this.state;

        return(
            <div style={{backgroundColor: 'var(--Color-One)'}} className="home-page">
                <h1 style={{color: 'black'}}>Welcome to the Grand Antique Store</h1>
                <Navbar detailsCart={detailsCart} filterContainer={this.filterContainer}/>
                <>{screen}</>

            </div>
        );
    }
}

export default Homepage;