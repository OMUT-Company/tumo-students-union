import React from "react"
import './style.scss'

const Video = () => {
    const videoUrl = {
        url: "http://thenewcode.com/assets/videos/fashion.mp4",
        type: "video/mp4"
    }

    return (
        <div className="container">

            <video videourl={videoUrl.url} type={videoUrl.type} className="video" autoPlay muted loop>
                <source src={videoUrl.url} type={videoUrl.type} />

            </video>
            <h1 className="text">{"Where fun happens"}</h1>
        </div>
    )
}
export default Video