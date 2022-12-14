import React, { useState } from "react"
import './style.scss'

const Video = () => {
    const [state, setCount] = useState({
        videoUrl: "http://thenewcode.com/assets/videos/fashion.mp4",
        type: "video/mp4"
    });

    return (
        <div className="container">
            <h1 className="text">{"Where fun happens"}</h1>
            <video videourl={state.videoUrl} type={state.type} className="video" autoPlay muted loop>
                <source src={state.videoUrl} type={state.type} />
            </video>
        </div>
    )
}
export default Video