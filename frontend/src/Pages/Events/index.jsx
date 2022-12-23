import React from "react"
import Wrap from "../../Layouts/DefaultLayout"
import ModalForUsers from "./ModalForUsers";

const Events = () => {
    return (
        <div>
            <ModalForUsers
                show={true}
            />
        </div>
    )
}
export default Wrap(Events)