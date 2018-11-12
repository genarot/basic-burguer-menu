import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { throws } from 'assert';
import Input from '../../../components/UI/Input/Input';

//Redux
import {connect} from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true, 
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value:'cheapest',
                validation: {},
                valid:true
            } 
        },
        formIsValid: false,
        loading: false
    }

    checkValidity( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        } 
        if ( !!rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( !!rules.minLength ) {
            isValid = value.trim().length >=  rules.minLength && isValid
        }
        if ( !!rules.maxLength ) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangeHandler = (e, inputIdentifier) => {
        console.log(inputIdentifier);
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = updatedOrderForm[inputIdentifier];

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        let formIsValid = true;
        for ( let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        console.log(updatedFormElement);
        
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid:formIsValid
        })
    }
    orderHandler = (e) => {
        e.preventDefault();

        this.setState({ 
                        loading: true
                    })
        const formData = {};
        for ( let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price:  this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
        .then((result) => {
            console.log(result);
            // setTimeout(() => {
                this.setState({loading: false, purchasing: false})
                this.props.history.push('/');
            // }, 500);
        }).catch((err) => {
            console.error(err);
            
            // setTimeout(() => {
                this.setState({loading: false, purchasing: false})
            // }, 1000);
        });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {
                    this.state.loading ?
                        <Spinner />
                    :
                        <form onSubmit={this.orderHandler}>
                            {
                                Object.keys(this.state.orderForm).map( key => {
                                    const {elementConfig,touched,value,valid,validation, elementType} = this.state.orderForm[key];
                                    return (
                                        <Input 
                                                key={key}
                                                onChange={this.handleChange} 
                                                elementType={elementType} 
                                                elementConfig={elementConfig}
                                                value={value}
                                                invalid={!valid}
                                                touched={touched}
                                                shouldValidate={!!validation}
                                                changed={(event) => this.inputChangeHandler(event, key)}/>

                                    )
                                })
                            }
                            {/* <Input onChange={this.handleChange} inputtype="input" type="text"  name="email" placeholder="Your Email"/>
                            <Input onChange={this.handleChange} inputtype="input" type="text"  name="street" placeholder="Your Street"/>
                            <Input onChange={this.handleChange} inputtype="input" type="text"  name="postalCode" placeholder="Postal Code"/> */}
                            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);