import React, { useState } from 'react'
import { Plus, Pencil, Trash } from 'lucide-react';
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import AddUser from '../components/AddUser';
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import { useGetTeamListQuery } from '../redux/slices/api/userApiSlice';

function Users() {
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [selected, setSelected] = useState(null);

    const { data, isLoading } = useGetTeamListQuery()

    console.log(data)

    const userActionHandler = () => { };
    const deleteHandler = () => { };

    const deleteClick = (id) => {
        setSelected(id);
        setOpenDialog(true);
    };

    const editClick = (el) => {
        setSelected(el);
        setOpen(true);
    };


    const TableHeader = () => (
        <thead className='border-b border-gray-300'>
            <tr className='text-black text-left'>
                <th className='py-2'>Full Name</th>
                <th className='py-2'>Title</th>
                <th className='py-2'>Email</th>
                <th className='py-2'>Role</th>
                <th className='py-2'>Active</th>
            </tr>
        </thead>
    )

    const TableRow = ({ user }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
            <td className='p-2'>
                <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
                        <span className='text-xs md:text-sm text-center'>
                            {getInitials(user.name)}
                        </span>
                    </div>
                    {user.name}
                </div>
            </td>

            <td className='p-2'>{user.title}</td>
            <td className='p-2'>{user.email || "user.emal.com"}</td>
            <td className='p-2'>{user.role}</td>

            <td>
                <button
                    // onClick={() => userStatusClick(user)}
                    className={clsx(
                        "w-fit px-4 py-1 rounded-full",
                        user?.isActive ? "bg-blue-200" : "bg-yellow-100"
                    )}
                >
                    {user?.isActive ? "Active" : "Disabled"}
                </button>
            </td>

            <td className='p-2 flex gap-4 justify-end'>
                <button
                    type="button"
                    className="px-3 py-2 outline-none text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
                    onClick={() => editClick(user)}
                >
                    <Pencil />
                </button>

                <button
                    type="button"
                    className="px-3 py-2 outline-none text-red-700 hover:text-red-500 font-semibold sm:px-0"
                    onClick={() => deleteClick(user?._id)}
                >
                    <Trash />
                </button>
            </td>
        </tr>
    );

    return (
        <>
            <div className='w-full md:px-1 px-0 mb-6'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className="text-2xl font-semibold capitalize">
                        Team Members
                    </h2>
                    <button
                        type="button"
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5 px-3 py-2 outline-none"
                        onClick={() => setOpen(true)}
                    >
                        <span>Add New User</span>
                        <Plus />
                    </button>
                </div>
                <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                        <table className='w-full mb-5'>
                            <TableHeader />
                            <tbody>
                                {data?.map((user, index) => (
                                    <TableRow key={index} user={user} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddUser
                open={open}
                setOpen={setOpen}
                userData={selected}
                key={new Date().getTime().toString()}
            />

            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
            />

            <UserAction
                open={openAction}
                setOpen={setOpenAction}
                onClick={userActionHandler}
            />
        </>
    )
}

export default Users
