import React from 'react'
import Form from './Form'
import Logo from './Logo'
import Nav from './pages/Nav'

const Header = () => {


  return (
   <div className='header'>
   <div className="banner">
 
   <Logo/> <Form/><Nav/></div>    
   {/* <div className="banner_plate">



   </div> */}
   </div>
  )
}

export default Header
