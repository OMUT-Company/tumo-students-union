import React, {useState} from 'react';
import {EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined} from '@ant-design/icons';
import {Avatar, Card, Modal} from 'antd';
import {png} from "../../../Assets/png"

const {Meta} = Card;

const Cart = ({edit, handleOk, organizationDetails}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenInfo, setIsModalOpenInfo] = useState(false)
    const {address, name, number, director, email, _id} = organizationDetails

    return (
        <React.Fragment>
            <Card
                style={{width: 300}}
                cover={
                    <img
                        alt="example"
                        src={png.Omut}
                    />
                }
                actions={[
                    <DeleteOutlined onClick={() => setIsModalOpen(true)} key="delete"/>,
                   edit ? <EditOutlined onClick={() => edit(_id)} key="edit"/> : "",
                    <EllipsisOutlined onClick={() => setIsModalOpenInfo(true)} key="info"/>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                    title={name}
                />
            </Card>
            <Modal
                title="Warning!!!"
                open={isModalOpen}
                onOk={() => (handleOk(_id), setIsModalOpen(false))}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Are you sure you want to delete the organization?</p>
            </Modal>
            <Modal
                title={name}
                open={isModalOpenInfo}
                onOk={() => setIsModalOpenInfo(false)}
                onCancel={() => setIsModalOpenInfo(false)}
            >
                <div className="organizations_info">
                    <ul>
                        <li><span>Director :</span> {director}</li>
                        <li><span>Address :</span> {address}</li>
                        <li><span>Number :</span> {number}</li>
                        <li><span>Email :</span> {email}</li>
                    </ul>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default Cart;