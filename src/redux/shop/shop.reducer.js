import SHOP_DATA from './shop.data'

import ShopActionTypes from './shop.types'
import ShopAction from './shop.actions'

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    // and again because as of now we dont have any modifications
    // so we will be just returning the default state
    switch(action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state
    }
}

export default shopReducer


