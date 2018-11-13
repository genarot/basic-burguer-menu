import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4, 
    error: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    return updateObject(
        state,
        {
            ingredients: { 
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        }
    )
}

const removeIngredient = (state, action) => {
    return updateObject(
        state,
        {
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        })
}

const setIngredient = ( state, action ) => {
    return updateObject(
        state,
        {ingredients: action.ingredients, error: false, totalPrice: 4}
    )
}

const fetchIngredientsFail = (state, action ) => {
    return updateObject(
        state,
        {error: true}
    )
}
const burguerReducer = ( state = initialState , action ) => {
    switch( action.type ) {
        case ADD_INGREDIENT:    return addIngredient(state, action);
        case REMOVE_INGREDIENT: return removeIngredient(state, action);
        case SET_INGREDIENTS:   return setIngredient(state, action);
        case FETCH_INGREDIENTS_FAILED:  return fetchIngredientsFail(state, action);
        default:    return state;
    }
}

export default burguerReducer;