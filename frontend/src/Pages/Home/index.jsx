import React from "react"
import Wrap from "../../Layouts/DefaultLayout"
import './style.scss'
import Video from "./Video"

const Home = () => {
    return (
        <>
            <Video />
            <div className="events-container wrapp">
                <section className="about-union">
                    <h3>👋 We're OMUT Union </h3>
                    <p>
                        We’ll help you make the most of UCL, we're the place where more happens. The centre of your campus community, your route to the best parts of university life.
                    </p>
                </section>
                <section className="about-text">
                    <h3 className="events-header">
                        New Events
                    </h3>
                    <h3 className="events-header">
                        All Events
                    </h3>
                </section>
            </div>
        </>
    )
}
export default Wrap(Home)