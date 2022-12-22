import React, {useEffect, useState} from "react"
import useWindowSize from "../../Hooks/uswWindowSize";
import {Button, ConfigProvider, Input, Select} from "antd";
import {png} from "../../Assets/png";
import {useDispatch, useSelector} from "react-redux";
import {volunteerApply} from "../../Store/Content/contentSlice";
import Notification from "../../Components/atoms/Notification";
import {getAllFunders} from "../../Store/Admin/adminSlice";

const FormFields = {
    name: "",
    surname: "",
    age: null,
    gender: {value: "", text: ""},
    phoneNumber: "",
    email: "",
    previouslyApplied: {value: "", text: ""}
}
const JoinUs = () => {
    const form = JSON.parse(JSON.stringify(FormFields))
    const [formData, setFormData] = useState(form)
    const [status, setStatus] = useState({})
    const {isError, errorMessage,isSuccess,data} = useSelector(state => state.content.volunteerApply)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError){
            setStatus({type: "error", message: errorMessage, placement: "topRight", resetSection: "volunteerApply"})
        }

        if (isSuccess){
            const form = JSON.parse(JSON.stringify(FormFields))
            setFormData(form)
            setStatus({type: "success", message: data.data.message, placement: "topRight", resetSection: "volunteerApply"})
        }
    }, [isError, errorMessage,isSuccess])


    const inputHandle = (e) => {
        const copy = {...formData}

        if (e.target) {
            copy[e.target.name] = e.target.value
        } else {
            if (e === "yes" || e === "no") {
                copy.previouslyApplied = e === "yes" ? {value: "yes", text: "Yes"} : {value: "no", text: "No"}
            } else {
                copy.gender = e === "male" ? {value: "male", text: "Male"} : {value: "female", text: "Female"}
            }
        }
        setFormData(copy)
    }

    const join = () => {
        let data = {
            name: formData.name,
            surname: formData.surname,
            age: formData.age,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            gender: formData.gender.value,
            previouslyApplied: formData.previouslyApplied.value === "yes"
        }

        dispatch(volunteerApply(data))
    }

    return (
        <section className="join-us">
            <h3 className="join-us_title">Join Us!!!</h3>
            <div className="join-us_content">
                <div className="join-us_content_form">
                    <InputConfig>
                        <Input name="name" placeholder="Name" value={formData.name} type="string"
                               onChange={inputHandle}/>
                    </InputConfig>
                    <InputConfig>
                        <Input name="surname" placeholder="surname" value={formData.surname} type="string"
                               onChange={inputHandle}/>
                    </InputConfig>
                    <InputConfig>
                        <Input name="age" placeholder="Age" value={formData.age} type="number" onChange={inputHandle}/>
                    </InputConfig>
                    <InputConfig>
                        <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} type="string"
                               onChange={inputHandle}/>
                    </InputConfig>
                    <InputConfig>
                        <Input name="email" placeholder="Email" value={formData.email} type="email"
                               onChange={inputHandle}/>
                    </InputConfig>
                    <div className="join-us_content_form_select">
                        <InputConfig>
                            <Select
                                placeholder="Have you applied before?"
                                style={{width: "inherit"}}
                                value={formData.previouslyApplied}
                                options={[
                                    {value: "yes", text: "Yes"},
                                    {value: "no", text: "No"}
                                ]}
                                onChange={inputHandle}
                            />
                        </InputConfig>
                    </div>
                    <div className="join-us_content_form_select">
                        <InputConfig>
                            <Select
                                placeholder="Select a gender"
                                value={formData.gender}
                                style={{width: "inherit"}}
                                options={[
                                    {value: "male", text: "Male"},
                                    {value: "female", text: "Female"}
                                ]}
                                onChange={inputHandle}
                            />
                        </InputConfig>
                    </div>
                    <div className="join-us_content_form_btn">
                        <Button
                            type="primary"
                            style={{width: 100, backgroundColor: "#162831"}}
                            size={"large"}
                            onClick={join}
                        >
                            JOIN
                        </Button>
                    </div>
                </div>
                <div className="join-us_content_img">
                    <div>
                        <img alt="join-us" src={png.Tree}/>
                    </div>
                </div>
            </div>
            <Notification
                type={status?.type}
                message={status?.message}
                placement={status?.placement}
                resetSection={status?.resetSection}
                setError={setStatus}
                stateOther={true}
            />
        </section>
    )
}

export const InputConfig = ({children}) => {
    const {width} = useWindowSize()
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#162831',
                    fontSize: width > 991 ? "18px" : "14px",
                    lineHeight: width > 991 ? "18px" : "14px",
                    controlHeight: width > 991 ? 63 : 45,
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export const ButtonConfig = ({children}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorBgContainer: "#00b96b",
                    fontSize: "20px",
                    screenMD: 20
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default JoinUs