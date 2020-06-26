import React from 'react'
import '../styles/NavBar.css'
import { NavLink as NL } from 'react-router-dom'
const NavBar = () => {
    return (
        <div className="navBar">
          <NL exact to='/'>Rules</NL>  
          <NL exact to='/game'>Play Conway's Game of Life</NL>
        </div>
    )
}

export default NavBar