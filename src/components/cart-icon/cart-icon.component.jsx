import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';

import shoppingIcon from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

   const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

   return (
      <div className='cart-icon-container' onClick={toggleIsCartOpen}>
         <img
            className='shoppping-icon'
            src={shoppingIcon}
            alt='chart logo image'
         />
         <span className='item-count'>{cartCount}</span>
      </div>
   );
};

export default CartIcon;
