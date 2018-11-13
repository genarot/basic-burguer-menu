import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom'

//Redux
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props.match.path + '/contact-data');
        
        return (
                !!this.props.ings ?
                <div>
                        {
                            !!this.props.purchased ? <Redirect to="/" /> : null
                        }
                        <CheckoutSummary 
                                ingredients={this.props.ings}
                                checkoutCancelled={this.checkoutCancelledHandler}
                                checkoutContinue={this.checkoutContinueHandler}
                                />
                        <Route 
                            path={this.props.match.path + '/contact-data' } 
                            component={ContactData} />
                            />
                </div>
                :
                <Redirect to="/" />
        );
    }
}

function mapStateToProps(state) {
    return {
        ings: state.burguerBuilder.ingredients,
        // price: state.burguerBuilder.totalPrice
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);