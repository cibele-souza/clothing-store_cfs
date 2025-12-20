import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';

import shoppingIcon from '../../assets/shopping-bag.svg';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

   const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

   return (
      <CartIconContainer onClick={toggleIsCartOpen}>
         <ShoppingIcon src={shoppingIcon} alt='chart logo image' />
         <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
   );
};

export default CartIcon;
