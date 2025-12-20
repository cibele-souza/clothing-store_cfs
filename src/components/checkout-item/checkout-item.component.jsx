import { useContext } from 'react';
import CartContext from '../../contexts/cart.context';

import {
   CheckoutItemContainer,
   ImageContainer,
   BaseSpan,
   Quantity,
   Arrow,
   Value,
   RemoveButton,
} from './checkout-item.styles';

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
      <CheckoutItemContainer>
         <ImageContainer>
            <img src={imageUrl} alt={`${name}`} />
         </ImageContainer>
         <BaseSpan>{name}</BaseSpan>
         <Quantity>
            <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={addItemHandler}>&#10095;</Arrow>
         </Quantity>
         <BaseSpan>{price}</BaseSpan>
         <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
   );
};

export default CheckoutItem;
