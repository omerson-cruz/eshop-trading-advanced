import CartActionTypes from './cart.types'

// we're not gonna pass a payload since we are just flipping the
// hidden propety inside of cart.reducer
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
})

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})


