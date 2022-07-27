import React from "react";
import Navbar from "./Navbar";
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

        const {loading, error, details, page} = this.state;

        return(
            <div className="home-page">
                <h1 style={{color: 'black'}}>Welcome to the Grand Antique Store</h1>
                <Navbar filterContainer={this.filterContainer}/>
                <div>
                    {!loading ? details.filter(product => {
                        console.log(product.category);
                        console.log(page);
                        return product.category === page || page === null})
                                        .map(item => (
                                            <div style={{color: 'red'}}>{item.title}</div>
                                        ))
                        : <div style={{color: 'red'}}>Loading...</div>
                    }
                </div>

            </div>
        );
    }
}

export default Homepage;