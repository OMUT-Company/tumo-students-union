import React from 'react';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, SettingOutlined,ApartmentOutlined } from '@ant-design/icons';
import {Button, Menu} from 'antd';

import "./style.scss"

function getItem(label, key, icon, children, type)  {
    return {
        key,
        icon,
        children,
        label,
        type,
    } ;
}

const items = [
    getItem('Organizations', 'sub1', <ApartmentOutlined />, [
        getItem('Add Funders', '1'),
        getItem('See Funders', '2'),
        getItem('See Suggestion', '3'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),

    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const DashboardLayout = ({children}) => {
    const navigate = useNavigate()
    const onClick = (e) => {
        switch (e.key){
            case "1":
                navigate("/admin/dashboard/funder/add")
                break
            case "2":
                navigate("/admin/dashboard/funder/see")
                break
        }
        console.log('click ', e);
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard_head">
                <div className="admin-dashboard_head_logo">OMUT</div>
                <div>
                    <Button onClick={()=>alert()} type={"primary"}>Sign out</Button>
                </div>
            </div>
            <div>
                <div className="admin-dashboard_sidebar">
                    <Menu
                        onClick={onClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </div>
                <div className="admin-dashboard_content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;