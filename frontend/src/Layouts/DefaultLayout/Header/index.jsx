import React from "react"
import {Link} from "react-router-dom"

import '../Header/style.scss'

const Header = () => {
    return (
        <React.Fragment>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        <i class="fa-solid fa-bars"></i>skype
                    </Link>
                </div>
            </nav>
        </React.Fragment>
    )
}
export default Header