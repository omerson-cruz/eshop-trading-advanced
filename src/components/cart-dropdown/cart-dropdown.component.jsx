import React from 'react'
import './cart-dropdown.styles.scss'
import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// using cart selector
import { selectCartItems } from '../../redux/cart/cart.selector'

const Cart = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem => {
                    return (<CartItem key={CartItem.id} item={cartItem}></CartItem>)
                })
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

// using the cartItem selector that's why we need to pass the
//   WHOLE STATE
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})


export default connect(mapStateToProps)(Cart)