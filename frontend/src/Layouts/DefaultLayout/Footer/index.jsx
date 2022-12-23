import { Link } from "react-router-dom"
import '../Footer/style.scss'
import logo from "../../../Assets/png/logo2.png";

const Footer = () => {
    return (
        <footer>
            <div className="wrapper">
                <section className="footer__about">
                    <div className="footer__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <p>Oriented, Motivated, Unique Thinking.</p>
                </section>
                <section className="footer__info">
                    <div className="footer__contact">
                        <h5>Contact Information</h5>
                        <p>Halabyan 2</p>
                        <p>hakobyang899@gmail.com</p>
                        <p>+374 66 66 66</p>
                    </div>
                </section>
                <div>
                    <Link to='/faq'>FAQ</Link>
                </div>
            </div>
            <hr />
            <section className="credentials wrapper ">

                <p><i class="fa-regular fa-copyright"></i>Made by OMUT Company</p>

                <ul className="social-links">
                    <li><i class="fa-brands fa-facebook-f"></i></li>
                    <li><i class="fa-brands fa-twitter"></i></li>
                    <li><i class="fa-brands fa-instagram"></i></li>
                    <li><i class="fa-brands fa-linkedin-in"></i></li>
                    <li><i class="fa-brands fa-whatsapp"></i></li>
                </ul>

            </section>
        </footer >
    )
}
export default Footer