import CartActionTypes from './cart.types'
import { addItemToCart } from './cart.utils'


const INITIAL_STATE = {
    hidden: true ,    // initially we wanna hide the dropdown when they come to our website

    cartItems: [],    // this wil hoold the array of cart Items
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer