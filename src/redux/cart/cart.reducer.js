import CartActionTypes from './cart.types'

const INITIAL_STATE = {
    hidden: true     // initially we wanna hide the dropdown when they come to our website
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
}

export default cartReducer