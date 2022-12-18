import React, {useEffect} from "react";
import {notification} from 'antd';
import {useDispatch} from "react-redux";
import {reset} from "../../../Store/Admin/adminSlice";

const Notification = ({message, type, placement, resetSection,setError}) => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch()

    useEffect(() => {
        if (message && type) {
            openNotification(message, placement,type)
            dispatch(reset(resetSection))
            setError({type: "", message: "", placement: "", resetSection: ""})
        }
    }, [message])

    const openNotification = (message, placement, type) => {
        switch (type) {
            case "error":
                api.error({
                    message: "Error",
                    description: message,
                    placement,
                })
                break
            case "success":
                api.success({
                    message: "Success",
                    description: message,
                    placement,
                })
                break
            case "info":
                api.info({
                    message: "Info",
                    description: message,
                    placement,
                })
                break
        }
    }
    return (
        <div>
            {contextHolder}
        </div>
    )
}
export default Notification