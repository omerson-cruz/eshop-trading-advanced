export const addItemToCart = (cartItems, cartItemToAdd) => {

    // so here we are checking if that cartItemToAdd already exist
    // if cartItemToAdd not found then will be undefined
    const existingCartItem =
        cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    // if existingCartItem then let's increase the quantity of that Item.id
    if (existingCartItem) {
        // remember we need to return NEW version of our cartItem Array in order to
        // make the Reactivity works
        return cartItems.map(cartItem =>
                cartItem.id === cartItemToAdd.id ?
                {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
                : cartItem
            )
    }

    // if the cartItem.id is not yet existing. (existingCartItem === undefined)
    // Then let's return a new Array that contains
    //  the new "cartItemToAdd" plus its base quantity = 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}