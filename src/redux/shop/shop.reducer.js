import SHOP_DATA from './shop.data'

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    // and again because as of now we dont have any modifications
    // so we will be just returning the default state
    switch(action.type) {
        default:
            return state
    }
}

export default shopReducer


