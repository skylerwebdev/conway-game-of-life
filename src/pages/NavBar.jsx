import React from 'react'
import { NavLink as NL } from 'react-router-dom'
const NavBar = () => {
    return (
        <div>
          <NL exact to='/'>Rules</NL>  
          <NL to='/game'>Play Conway's Game of Life</NL>
        </div>
    )
}

export default NavBar