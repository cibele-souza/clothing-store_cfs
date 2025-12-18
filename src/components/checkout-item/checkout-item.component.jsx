import { useContext } from 'react';
import CartContext from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
   const { name, imageUrl, price, quantity } = cartItem;

   const { addItemToCart, removeItemToCart, clearItemFromCart } =
      useContext(CartContext);

   const addItemHandler = () => addItemToCart(cartItem);
   const removeItemHandler = () => removeItemToCart(cartItem);
   const clearItemHandler = () => clearItemFromCart(cartItem);
   // Purposes of creating these handlers functions instead of just using the functions directly in the event listener (onClick):
   // 1. Code clarity: if any of these methods change (addItemToCart, removeItemToCart, clearItemFromCart), we have a very clear
   // idea of where these definitions are rather than being inside of our JSX
   // 2. Optimization: more on that later...

   return (
      <div className='checkout-item-container'>
         <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
         </div>
         <span className='name'>{name}</span>
         <span className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>
               &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>
               &#10095;
            </div>
         </span>
         <span className='price'>{price}</span>
         <div className='remove-button' onClick={clearItemHandler}>
            &#10005;
         </div>
      </div>
   );
};

export default CheckoutItem;
