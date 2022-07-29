import React from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import CommerceService from "./services";
const commerce = new CommerceService();

class Homepage extends React.Component {
    state = {
        details: [],
        error: false,
        loading: false,
        page: null,
    }
    
    componentDidMount() {
        this.setState({loading: true});
        commerce.allDetails().then((res) => {
            if(res && res.response.ok) {
                this.setState({
                    details: res.details,
                    loading: false,
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
        this.setState({page: value});
    }

    

    render() {

        const {loading, details, page} = this.state;

        return(
            <div className="home-page">
                <h1 style={{color: 'black'}}>Welcome to the Grand Antique Store</h1>
                <Navbar filterContainer={this.filterContainer}/>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap:'1rem', marginTop: '1rem'}}>
                    {!loading ? details.filter(product => {return product.category === page || page === null})
                                       .map(item => (
                                            <ProductCard key={item.imageId} details={item}/>
                                        ))
                        : <div style={{color: 'white', backgroundColor: 'var(--Color-Three)'}}>Loading...</div>
                    }
                </div>

            </div>
        );
    }
}

export default Homepage;