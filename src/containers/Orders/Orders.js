import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

//Redux
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/actions'

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersFetch();
    }

    render() {
        return (
            <div>
                {
                    this.props.loading ?
                    <Spinner />
                    :
                    this.props.orders.map( order => {
                        return <Order key={order.key} ingredients={order.ingredients} price={order.price}/>
                    })
                }
                
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    orders: state.order.orders,
    loading: state.order.loading
})

const mapDispatchToProps = ( dispatch ) => ({
    onOrdersFetch: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios))