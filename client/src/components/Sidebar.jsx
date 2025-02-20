import React from "react";
import {
    LayoutDashboard,
    CheckSquare,
    Users,
    CircleCheckBig,
    SquareChartGantt,
    ListTodo,
    Trash
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSidebarOpen } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <LayoutDashboard size={20} />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <CheckSquare size={20} />,
    },
    {
        label: "Team",
        link: "team",
        icon: <Users size={20} />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <CircleCheckBig size={20} />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <SquareChartGantt size={20} />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <ListTodo size={20} />,
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <Trash size={20} />,
    },
];

const Sidebar = () => {
    const { user, isSidebarOpen } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 7);

    const closeSidebar = () => {
        dispatch(setSidebarOpen(false));
    };

    const NavLink = ({ el }) => {
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full flex gap-2 px-3 py-2 rounded-lg items-center text-gray-700 text-base hover:bg-blue-100",
                    path === el.link.split("/")[0] ? "bg-blue-500 text-white" : ""
                )}
            >
                <span className="text-lg">{el.icon}</span>
                <span>{el.label}</span>
            </Link>
        );
    };

    return (
        <div className={`h-screen bg-gray-100 text-gray-900 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-48'}`}>
            <div className="p-4 pb-5 flex justify-center items-center border-b border-gray-300 bg-white">
                <h1 className="flex gap-1 items-center">
                    <span className="bg-blue-500 p-1 rounded-full">
                        <CheckSquare size={18} className="text-white" />
                    </span>
                    <span className="text-xl font-bold text-gray-800">TaskFlow</span>
                </h1>
            </div>

            <div className="flex-1 flex flex-col gap-y-4 py-6 px-2">
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
