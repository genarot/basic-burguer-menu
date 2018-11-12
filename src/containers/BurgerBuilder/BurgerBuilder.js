import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//Redux
import { connect } from 'react-redux'
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        
        // axios.get('/ingredientes.json')
        // .then((result) => {
        //     console.log(result);
        //     this.setState({ ingredients: result.data })
        // }).catch((err) => {
        //     console.log(err);
        //     this.setState({error: true})
        // });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
            return sum > 0 ;
    }

    addIngredientHandler = ( type ) => {
        console.log('addIngredient', type);
        this.props.onIngredientAdded(type)
        // se puede eliminar el metodo
    }

    removeIngredientHandler = ( type ) => {
        console.log('removeIngredient', type);
        this.props.onIngredientRemoved(type);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];

        // for ( let i in this.props.ings ) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.totalPrice );

        // const queryString   = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout'
            // search: '?'+queryString
        })
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {
                        this.state.loading ? 
                         <Spinner />
                        :(
                            this.props.ings ?
                            <OrderSummary 
                                ingredients={this.props.ings}
                                price={this.props.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} /> 
                                :null
                        )
                    }
                </Modal>
                {
                    !!this.props.ings ?
                    <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            price={this.props.totalPrice} />
                    </Aux>
                    :
                    ( !this.state.error ? <Spinner /> : <p>Ingredients can't be loaded!</p>)
                }
            </Aux>
        );
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps',state);
    
    return{
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));