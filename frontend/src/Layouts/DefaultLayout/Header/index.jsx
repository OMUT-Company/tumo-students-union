// import { Link } from "react-router-dom"
import '../Header/style.scss'
import { Link, NavLink } from "react-router-dom"
import navLogo from '../../../assets/images/logo2.png'

const Header = () => {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'><Link to='/' className='navbar-logo'   >
                    <i class="fa-solid fa-bars"></i>skype
                </Link></div>
            </nav>
        </>
    )
}
export default Header