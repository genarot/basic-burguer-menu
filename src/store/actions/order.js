import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurguerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
} 

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    };
}

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    };
} 

export const purchaseBurguer = (orderData) => async (dispatch) => {
    await dispatch(purchaseBurguerStart())
    await axios.post('/orders.json', orderData)
        .then((result) => {
            dispatch(purchaseBurguerSuccess(result.data.name, orderData))
        }).catch((err) => {
            dispatch(purchaseBurguerFail(err))
        });
}

export const purchaseInit   = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = () => async (dispatch, getState) => {
    await dispatch(fetchOrdersStart());
    await axios.get('/orders.json')
    .then((result) => {
        const fetchedOrders = [];
        for ( let key in result.data ) {
            fetchedOrders.push({
                ...result.data[key],
                id: key
            });
        }
        console.log(fetchedOrders);
        dispatch(fetchOrdersSuccess(fetchedOrders))
        // this.setState({ orders: result.data, loading:false})
    }).catch((err) => {
        dispatch(fetchOrdersFail(err))
    });
}