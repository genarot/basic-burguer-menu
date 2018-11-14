import * as actionTypes from './actionTypes';
import axios from 'axios'

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => async (dispatch, getState) => {
    await axios.get('https://react-my-burguer-7b7a2.firebaseio.com/ingredientes.json')
    .then((result) => {
        console.log(result);
        dispatch(setIngredients(result.data))
    }).catch((err) => {
        console.log(err);
        dispatch(fetchIngredientsFailed())
    });
}