import React from 'react'
// router related import
import { Link } from 'react-router-dom'
// redux-related import
import { connect } from 'react-redux'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

import { auth } from '../../firebase/firebase.utils'

// shopping icon
import CartIcon from '../cart-icon/cart-icon.component'
// cart dropdown
import CartDropdown from '../cart-dropdown/cart-dropdown.component'


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>

        {
            currentUser ?
            (
                <div className='option' onClick={() => auth.signOut() }>SIGN OUT</div>
            )
            :
            <Link className='option' to='/signin'>SIGN IN</Link>
        }

        {/* <Cart currentUser={currentUser} /> */}

        <CartIcon />
        </div>
        {/* <CartDropdown /> */}
        {
            !hidden && (<CartDropdown />)
        }

    </div>
)

// mapToStateProps is just a function that returns an object where the name of the property is the property you wanna pass in As PROP to the component

// argv1 - " state of the whole root reducer" or the root reducer
// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser
// })

// advanced destructuring of nested objects to get the "currentUser" and "hidden"
//      from multiple reducers namely the user and cart reducer
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    // currentUser : currentUser,
    // hidden: hidden
    currentUser,
    hidden
})

// connect has 2 function arguments, the 2nd one being optional
//  it will return another function where we pass or feed in the Header component
// argv1 - is a function that allows us to access the states (the reducers) or the root reducer to be exact.
export default connect(mapStateToProps)(Header)