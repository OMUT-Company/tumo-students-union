import React, {useEffect, useState} from "react"
import DashboardLayout from "../../../Layouts/DashboardLayout";
import {useDispatch, useSelector} from "react-redux";
import {getAllFunders, deleteCurrentOrganization, reset} from "../../../Store/Admin/adminSlice";
import Cart from "../../../Components/atoms/cart";
import "./style.scss"
import Spinner from "../../../Components/atoms/Spinner";
import Notification from "../../../Components/atoms/Notification";
import {Button, Form, Input, Modal} from "antd";

const SeeFunder = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const {data, isLoading} = useSelector(state => state.admin.organizations)
    const {deleteOrganization} = useSelector(state => state.admin)
    const [error, setError] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(form.getFieldsValue())
    useEffect(() => {
        dispatch(getAllFunders())
        if (deleteOrganization.isError) {
            setError({
                type: "error",
                message: deleteOrganization.errorMessage,
                placement: "topRight",
                resetSection: "organizations"
            })
        }

        if (deleteOrganization.isSuccess) {
            dispatch(reset("deleteOrganization"))
            dispatch(reset("organizations"))
            setError({
                type: "success",
                message: deleteOrganization.data.data.message,
                placement: "topRight",
                resetSection: "addOrganization"
            })
        }
    }, [deleteOrganization.isError, deleteOrganization.errorMessage, deleteOrganization.isSuccess])

    const removeOrganization = (id) => {
        dispatch(deleteCurrentOrganization({id}))
    }

    const edit = () =>{
        setIsModalOpen(false)
        dispatch()
    }

    return (
        <DashboardLayout>
            <div className="organizations">
                {
                    data?.data.result.map(organization =>
                        <div key={organization._id} className="organizations_item">
                            <Cart
                                organizationDetails={organization}
                                handleOk={removeOrganization}
                                edit={() => setIsModalOpen(true)}
                            />
                        </div>
                    )
                }
                {
                    data?.data.result.length < 1 &&
                    <div className="organizations_none">
                        <h2>Sorry but you have not funders!!!</h2>
                    </div>
                }
            </div>
            <Modal
                title={"Edit"}
                open={isModalOpen}
                onOk={() => edit()}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Company Name"
                        name="name"
                        rules={[{required: false}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Director"
                        name="director"
                        rules={[{required: false}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="number"
                        rules={[{required: false}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{required: false}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: false}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 5,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
            <Notification
                type={error?.type}
                message={error?.message}
                placement={error?.placement}
                resetSection={error?.resetSection}
                setError={setError}
            />
            <Spinner loading={(isLoading || deleteOrganization.isLoading)}/>
        </DashboardLayout>
    )
}
export default SeeFunder