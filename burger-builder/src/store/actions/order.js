import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';
// import order from '../../components/Order/Order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    // this function uses redux saga now

    // return dispatch => {
    //     dispatch(purchaseBurgerStart());
    //     axios.post('/orders.json?auth=' + token, orderData)
    //         .then((response) => {
    //             dispatch(purchaseBurgerSuccess(response.data.name, orderData))
                
    //         })
    //         .catch((error) => {
    //             dispatch(purchaseBurgerFailed(error))
    //         });
    // }
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
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

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    // this function now uses redux saga

    // return dispatch => {
    //     dispatch(fetchOrdersStart());
    //     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    //     axios.get('./orders.json' + queryParams)
    //         .then(res => {
    //             const fetchedOrders = [];
    //             for (let key in res.data) {
    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }
    //         dispatch(fetchOrdersSuccess(fetchedOrders))
    //         })
    //         .catch(error => {
    //             dispatch(fetchOrdersFail(error))
    //         });
    // }
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
}