import React from 'react'
import './CartColumn.style.scss'

function CartColumn() {
   return (
      <div className="cart__column">
          <div className='content'>
        <h5>item</h5>
        <h5>price</h5>
        <h5>quantity</h5>
        <h5>subtotal</h5>
        <span></span>
      </div>
      <hr />
      </div>
   )
}

export default React.memo(CartColumn)
