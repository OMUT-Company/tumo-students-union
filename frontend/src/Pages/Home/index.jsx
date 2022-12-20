import React, {useEffect} from "react"
import Wrap from "../../Layouts/DefaultLayout"
import Video from "./Video"
import './style.scss'
import {useDispatch} from "react-redux";
import {applyAnEvent, getEvents, organizationOffer, volunteerApply} from "../../Store/Content/contentSlice";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getEvents())

        // dispatch(organizationOffer(
        //     {
        //         name: "Ino",
        //         director: "Artur",
        //         address:"adfbadf",
        //         number: "374930104",
        //         email:"gmail.com",
        //         message:"hello my friend"
        //     }
        // ))

        // dispatch(volunteerApply(
        //     {
        //         "name":"Artur",
        //         "surname":"Araqelyan",
        //         "age":227,
        //         "gender":"female",
        //         "phoneNumber":"+37493021372",
        //         "email":"artur.a@gmail.com",
        //         "previouslyApplied":false
        //     }
        // ))

        // dispatch(applyAnEvent({
        //     "eventId":"639f749130e7ea74d5ae3b60",
        //     "name":"Artur",
        //     "surname":"Araqelyan",
        //     "age":27,
        //     "gender":"male",
        //     "phoneNumber":"+37493021372",
        //     "email":"artur.araqedsdlyansv1995@gmail.com",
        //     "previouslyApplied":false
        // }))
    }, [])

    return (
        <div>
            <Video/>
            <div className="events-container wrapp">
                <section className="about-union">
                    <h3>👋 We're OMUT Union </h3>
                    <p>
                        We’ll help you make the most of UCL, we're the place where more happens. The centre of your
                        campus community, your route to the best parts of university life.
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
        </div>
    )
}
export default Wrap(Home)