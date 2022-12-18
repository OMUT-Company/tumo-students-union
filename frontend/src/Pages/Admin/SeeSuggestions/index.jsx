import React, {useEffect, useState} from "react"
import DashboardLayout from "../../../Layouts/DashboardLayout";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizationsOffer,reset} from "../../../Store/Admin/adminSlice";
import Cart from "../../../Components/atoms/cart";
import {png} from "../../../Assets/png";
import Modals from "./Modals";
import Notification from "../../../Components/atoms/Notification";
import Spinner from "../../../Components/atoms/Spinner";

const SeeSuggestions = () => {
    const dispatch = useDispatch()
    const {organizationsOffer,organizationOfferAnswer} = useSelector(state => state.admin)
    const [currentModal, setCurrentModal] = useState({modal:"",id:""})
    const [status, setStatus] = useState({})

    useEffect(() => {
        if(!organizationsOffer.data?.data.result){
            dispatch(getOrganizationsOffer())
        }

        if(organizationOfferAnswer.isSuccess){
            dispatch(getOrganizationsOffer())
            dispatch(reset("organizationOfferAnswer"))
            setStatus({
                type: "success",
                message: organizationOfferAnswer.data.data.message,
                placement: "topRight",
                resetSection: "addOrganization"
            })
        }

        if(organizationOfferAnswer.isError){
            dispatch(reset("organizationOfferAnswer"))
            setStatus({
                type: "error",
                message: organizationOfferAnswer.errorMessage,
                placement: "topRight",
                resetSection: "addOrganization"
            })
        }

    }, [organizationOfferAnswer.isSuccess,organizationOfferAnswer.isError,organizationsOffer.isSuccess])
    return (
        <DashboardLayout currentSection={"3"}>
            <div className="organizations">
                {
                    organizationsOffer.data?.data.result.map(organization =>
                        <div key={organization._id} className="organizations_item">
                            <Cart
                                details={organization}
                                onClick={setCurrentModal}
                                img={png.Omut}
                                deleteBtn={true}
                                infoBtn={true}
                                updateBtn={true}
                            />
                        </div>
                    )
                }
                {
                    organizationsOffer.data?.data.result.length < 1 &&
                    <div className="organizations_none">
                        <h2>Sorry but you have not offers!!!</h2>
                    </div>
                }
                <Modals
                    setCurrentModal={setCurrentModal}
                    currentOrg={organizationsOffer.data?.data.result.filter(elm=>elm._id === currentModal.id)[0]}
                    modal={currentModal.modal}
                />
                <Notification
                    type={status?.type}
                    message={status?.message}
                    placement={status?.placement}
                    resetSection={status?.resetSection}
                    setError={setStatus}
                />
                <Spinner loading={(organizationOfferAnswer.isLoading || organizationsOffer.isLoading)}/>
            </div>
        </DashboardLayout>
    )
}

export default SeeSuggestions