import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Protected = ({children}) => {
    const {isSuccess} = useSelector(state => state.admin.signIn)
    const navigate = useNavigate()
    console.log(isSuccess)
    useEffect(() => {
        if (!isSuccess) {
            navigate("/admin")
        } else {
            navigate("/admin/dashboard")
        }
    }, [isSuccess])

    return (
        <div>
            {
                isSuccess &&
                children
            }
        </div>
    )
}
export default Protected