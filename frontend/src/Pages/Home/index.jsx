import React, { useState } from "react"
import styles from './style.scss'

const Home = () => {
    const [state, setCount] = useState({
        videoUrl: "http://thenewcode.com/assets/videos/fashion.mp4",
        type: "video/mp4"
    });

    return (
        <div className="container">
            <h1 className="text">{"Women & Men Collection"}</h1>
            <video videoUrl={state.videoUrl} type={state.type} className="video" autoPlay muted loop>
                <source src={state.videoUrl} type={state.type} />
            </video>
        </div>
    )
}
export default Home