import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'

export default class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then((result) => {
            console.log(result.data);
            
            // this.setState({ orders: result.data})
        }).catch((err) => {
            this.setState({loading: false})
        });
    }

    render() {
        return (
            <div className="class-name">
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </div>
        );
    }
}