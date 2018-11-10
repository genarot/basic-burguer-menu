import React from 'react';
import classes from './Order.css'
import aux from '../../hoc/Aux';

const Order = (props) => {
    const {price } = props,
         ingredients = [];

    for ( let ingredientName in props.ingredients) {
        console.log(ingredientName);
        ingredients.push({ 
                            name: ingredientName, 
                            amount: props.ingredients[ingredientName]
                        })
    }
    const ingredientOuput = ingredients.map( ig =>{
        return <aux>
                    <span key={ig.name} 
                        style={{
                            textTransform: 'capitalize', 
                            display: 'inline-block', 
                            borderRadius: '8px',
                            color: 'white',
                            margin:'0 8px', padding:'5px', backgroundColor:'#4EB8FF'
                            }}>{ig.name} ({ig.amount})</span>
                </aux>
    })
    console.log(props);
    return (
        <div className={classes.Order}>
            <p>
                Ingredients: 
                {ingredientOuput}
            </p>
            <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;