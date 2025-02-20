import React from "react";
import { Search, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const toggleSidebar = () => {
        dispatch(setSidebarOpen(true));
    };

    return (
        <nav className="h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 block md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* search
                <div className="flex-1 max-w-2xl mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                        />
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div> */}

                <div className="flex items-center justify-end">
                    <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center cursor-pointer hover:bg-[#0ea371] transition-colors mr-10">
                        <span className="text-white font-medium text-lg">
                            <UserAvatar />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
