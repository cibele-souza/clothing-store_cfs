import { Fragment } from 'react'
import { Outlet, Link } from 'react-router'

import logo from '../../assets/crown.svg'

const Navigation = () => {
   return (
      <Fragment>
         <div className='navigation h-20 w-full flex mb-6 justify-between'>
            <Link className='logo-container h-full w-20 p-6' to='/'>
               <img className='logo' src={logo} alt="logo image" />
            </Link>
            <div className='nav-links-container w-1/2 h-full flex items-center justify-end'>
               <Link className='nav-link py-2.5 px-4 cursor-pointer' to='/shop'>SHOP</Link>
            </div>
            <div className='nav-links-container w-1/2 h-full flex items-center justify-end'>
               <Link className='nav-link py-2.5 px-4 cursor-pointer' to='/signin'>SIGN IN</Link>
            </div>
         </div>
         <Outlet />
      </Fragment>
   )
}

export default Navigation;