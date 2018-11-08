import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { throws } from 'assert';

class ContactData extends Component {
    state = {
        name: '',
        email:'',
        address: {
            street:     '',
            postalCode: ''
        },
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Genaro Tinoco',
                address: {
                    street: 'Ermita',
                    zipCode: '22000',
                    country: 'Nicaragua'
                },
                email: 'software01@casacross.com.ni'
            },
            deliveryMethod: 'fastest'
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
                        <form>
                            <input className={classes.Input}  onChange={this.handleChange}  type="text" name="name"      placeholder="Your Name"/>
                            <input className={classes.Input}  onChange={this.handleChange}  type="text" name="email"     placeholder="Your Email"/>
                            <input className={classes.Input}  onChange={this.handleChange}  type="text" name="address/street"    placeholder="Your Street"/>
                            <input className={classes.Input}    type="text" name="postal"    placeholder="Postal Code"/>
                            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}

export default ContactData;