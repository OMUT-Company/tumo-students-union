import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import Flag from "./LanguageToggle"
import '../Header/style.scss'
import logo from '../../../Assets/png/logo2.png'


const Header = () => {
    const [isMobile, setIsMobile] = useState(false)

    return (
        <nav className='navbar'>
            <NavLink to='/'>
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
            </NavLink>
            <div className="toggle-button" onClick={() => setIsMobile(!isMobile)}>
                {isMobile ? <i class="fa-regular fa-xmark"></i> : < i class="fa-solid fa-bars" ></i >}
            </div>
            <div className={isMobile ? 'navLinksMobile' : 'navLinks'} >
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/about'>About Us</NavLink>
                <NavLink to='/events'>Manage Events</NavLink>
                <NavLink to='/faq'>FAQ</NavLink>
            </div>

            <div className='nav-section'>
                <Flag text='RU' />
                <Flag text='ENG' />
                <Flag text='AM' />
            </div>

        </nav>


    )
}
export default Header

