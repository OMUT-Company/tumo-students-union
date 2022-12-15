import React from 'react';
import {Button, Form, Input} from 'antd';
import "./style.scss"
import {useDispatch} from "react-redux";
import {adminLogin} from "../../Store/Admin/adminSlice";

const Admin = () => {
    const dispatch = useDispatch()
    const onFinish = (values) => {
        dispatch(adminLogin(values))
    };
    return (
        <div className="admin-container">
            <div className="admin-container_form-block">
                <div className="admin-container_form-block_title">
                    <h1>OMUT</h1>
                </div>
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Admin