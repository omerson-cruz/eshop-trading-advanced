import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
    currentUser: { test: 'test'},
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }

            // can also be like below. But unreadable
            // return Object.assign({}, state, {
            //     currentUser: action.payload
            // })

            // break; // since we have return value we dont need break here

        default:      // it's important that we have default here because
                      // ALL REDUCERS are getting fired at once when an action is triggered
                      // even if that action is actually not related to this reducer
                      // so if this userReducer is called then we just returned the state
            return state
    }
}

export default userReducer