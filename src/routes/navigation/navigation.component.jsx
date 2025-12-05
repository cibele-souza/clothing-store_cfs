import { Fragment } from 'react'
import { Outlet, Link } from 'react-router'

import logo from '../../assets/crown.svg'
import './navigation.syles.scss'

const Navigation = () => {
   return (
      <Fragment>
         <div className='navigation'>
            <Link className='logo-container' to='/'>
               <img className='logo' src={logo} alt="logo image" />
            </Link>
            <div className='nav-links-container'>
               <Link className='nav-link' to='/shop'>SHOP</Link>
            </div>
         </div>
         <Outlet />
      </Fragment>
   )
}

export default Navigation;