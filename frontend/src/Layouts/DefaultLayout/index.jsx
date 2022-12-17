import Header from "./Header"
import Footer from "./Footer"

const Wrap = (WrapComponent) => {
    return (props) => {
        return (
            <>
                <Header />
                <WrapComponent {...props} />
                <Footer />
            </>

        )
    }
}
export default Wrap