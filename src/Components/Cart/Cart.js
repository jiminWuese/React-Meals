import React, { useContext, useState } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/Cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import link from '../../../private/link';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
      setIsCheckout(true);

    }

    const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
     await fetch(link +"/orders.json", {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      })
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    }

    const cartItem = (
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
    );

        const modalActions =  <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>

      const cartModalContent = <React.Fragment>
        {cartItem}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout &&  <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
        {!isCheckout && modalActions}
      </React.Fragment>

      const isSubmittingModalContent = <p>Sending order data....</p>
      const didSubmitModalContent = <React.Fragment>
        <p>Successfuly sent the order.</p>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </React.Fragment>

    return (
      <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
       
      </Modal>
    );
}

export default Cart;