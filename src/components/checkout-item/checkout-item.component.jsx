import React from 'react'

import './checkout-item.styles.scss'

const CheckoutItem = ( { cartItem: {name, imageUrl, price, quantity }}) => {
    console.log("imageUrl: ", imageUrl)
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>

        {/* a UTF-8 symbol or an Emoji thing for "x" button */}
        <div className='remove-button'>&#10005;</div>
    </div>
)}

export default CheckoutItem