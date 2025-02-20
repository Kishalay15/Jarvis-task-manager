import React from "react";
import {
    ClipboardList,
    ClipboardCheck,
    ListTodo,
    LayoutList
} from "lucide-react";
import { useSelector } from "react-redux";
import { summary } from "../assets/data";
import clsx from "clsx";
import Chart from "../components/Chart";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const userTasks = user?.role === "Admin" ? summary.last10Task : summary.last10Task.filter(task =>
        Array.isArray(task.team) && task.team.some(member => member._id === user._id)
    );

    const totals = userTasks.reduce((acc, task) => {
        acc[task.stage] = (acc[task.stage] || 0) + 1;
        return acc;
    }, {});

    const stats = [
        {
            _id: "1",
            label: "TOTAL TASKS",
            total: userTasks.length || 0,
            icon: <ClipboardList size={20} />,
            bg: "bg-[#af7ac5]",
        },
        {
            _id: "2",
            label: "COMPLETED TASKS",
            total: totals["completed"] || 0,
            icon: <ClipboardCheck size={20} />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "TASKS IN PROGRESS",
            total: totals["in progress"] || 0,
            icon: <ListTodo size={20} />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "TODOS",
            total: totals["todo"] || 0,
            icon: <LayoutList size={20} />,
            bg: "bg-[#1d4ed8]",
        },
    ];

    const Card = ({ label, count, bg, icon }) => {
        return (
            <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
                <div className='h-full flex flex-1 flex-col justify-between'>
                    <p className='text-base text-gray-600'>{label}</p>
                    <span className='text-2xl font-semibold'>{count}</span>
                </div>
                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
                    {icon}
                </div>
            </div>
        );
    };

    return (
        <div className='h-full py-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {stats.map(({ icon, bg, label, total }, index) => (
                    <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                ))}
            </div>
            <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
                <h4 className='text-xl text-gray-600 font-semibold'>Chart by Priority</h4>
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;
