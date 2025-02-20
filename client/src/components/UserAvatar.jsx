import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { User, Lock, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { toast } from "sonner";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { logout } from "../redux/slices/authSlice";

const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutUser] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate("/login")
        } catch (error) {
            toast.error("Something went wrong")
        }

    };

    const userInitials = user?.name ? getInitials(user.name) : '';

    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <div>
                    <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-colors flex'>
                        <span className='text-white font-semibold'>
                            {userInitials}
                        </span>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-gray-200 focus:outline-none'>
                        <div className='p-4'>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className='text-gray-700 hover:bg-blue-100 group flex w-full items-center rounded-md px-2 py-2 text-base'
                                    >
                                        <User className='mr-2 h-5 w-5 text-blue-600' aria-hidden='true' />
                                        Profile
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpenPassword(true)}
                                        className='text-gray-700 hover:bg-blue-100 group flex w-full items-center rounded-md px-2 py-2 text-base'
                                    >
                                        <Lock className='mr-2 h-5 w-5 text-blue-600' aria-hidden='true' />
                                        Change Password
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={logoutHandler}
                                        className='text-red-500 hover:bg-red-100 group flex w-full items-center rounded-md px-2 py-2 text-base'
                                    >
                                        <LogOut className='mr-2 h-5 w-5 text-red-500' aria-hidden='true' />
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

export default UserAvatar;
