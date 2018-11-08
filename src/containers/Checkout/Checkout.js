import React,{Component} from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
    state= {
        ingredients:    {},
        totalPrice:     0
    }

    componentDidMount()  {
        const   query = new URLSearchParams(this.props.location.search);
        const   ingredients = {};
        let     price = 0;

        for ( let param of query.entries() ) {
            if ( param[0] === 'price' ) 
                price = Number( param[1] )
            else
               ingredients[param[0]]= +param[1];
        }
        console.log(ingredients);
        this.setState({
            ingredients,
            totalPrice: price
        })
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
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                        />
                <Route 
                    path={this.props.match.path + '/contact-data' } 
                    render={ (props) => <ContactData ingredients={this.state.ingredients} {...props} price={this.state.totalPrice}/>} />
            </div>
        );
    }
}