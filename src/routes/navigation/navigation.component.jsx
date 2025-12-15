import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import logo from '../../assets/crown.svg';

const Navigation = () => {
   const { currentUser } = useContext(UserContext);

   return (
      <Fragment>
         <div className='navigation h-20 w-full flex mb-6 justify-between'>
            <Link className='logo-container h-full w-20 p-6' to='/'>
               <img className='logo' src={logo} alt='logo image' />
            </Link>
            <div className='nav-links-container w-1/2 h-full flex items-center justify-end'>
               <Link className='nav-link py-2.5 px-4 cursor-pointer' to='/shop'>
                  SHOP
               </Link>
               {currentUser ? (
                  <span
                     className='nav-link py-2.5 px-4 cursor-pointer'
                     onClick={signOutUser}
                  >
                     SIGN OUT
                  </span>
               ) : (
                  <Link
                     className='nav-link py-2.5 px-4 cursor-pointer'
                     to='/auth'
                  >
                     SIGN IN
                  </Link>
               )}
            </div>
         </div>
         <Outlet />
      </Fragment>
   );
};

export default Navigation;

// a component re-renders whenever its state updates or whenever its props changes
