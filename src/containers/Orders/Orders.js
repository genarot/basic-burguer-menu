import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';

export default class Orders extends Component {

    state = {
        orders: {},
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then((result) => {

            this.setState({ orders: result.data, loading:false})
        }).catch((err) => {
            this.setState({loading: false})
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                    <Spinner />
                    :
                    Object.keys(this.state.orders).map( key => <Order key={key} ingredients={this.state.orders[key].ingredients} price={this.state.orders[key].price}/>)
                }
                
            </div>
        );
    }
}