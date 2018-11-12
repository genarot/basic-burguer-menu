import React,{Component} from 'react';
import {Route} from 'react-router-dom'

//Redux
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    componentDidMount()  {
        // const   query = new URLSearchParams(this.props.location.search);
        // const   ingredients = {};
        // let     price = 0;

        // for ( let param of query.entries() ) {
        //     if ( param[0] === 'price' ) 
        //         price = Number( param[1] )
        //     else
        //        ingredients[param[0]]= +param[1];
        // }
        // console.log(ingredients);  
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props.match.path + '/contact-data');
        
        return (
            <div>
                <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                        />
                <Route 
                    path={this.props.match.path + '/contact-data' } 
                    // render={ (props) => <ContactData ingredients={this.props.ings} {...props} price={this.props.price}/>
                    component={ContactData} />
                    />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);