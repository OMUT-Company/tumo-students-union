import React from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { Badge, Calendar } from 'antd';

const getListData = (value) => {
    console.log(value)
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const AdminDashboard = () =>{

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }
    return(
        <DashboardLayout>
            return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
        </DashboardLayout>
    )
}
export default AdminDashboard