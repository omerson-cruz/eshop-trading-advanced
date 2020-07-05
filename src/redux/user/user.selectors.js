import {createSelector} from 'reselect'


// for best practices always start from the "state" then the specific reducer
// in this case we are selecting the reducer "user"
const selectUser = state => state.user


// here we are using multiple selectors from "cart" and "user" reducers
export const selectCurrentUser = createSelector(
   //[selectUser],       // this is the return value of "state.user"
   // this array can also be re-written as successive arguments
    selectUser,

    (user, cart) => user.selectCurrentUser
)
