import React from 'react';
import classes from './Order.css'

const Order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Price: USD <strong>4.56</strong></p>
        </div>
    );
};

export default Order;