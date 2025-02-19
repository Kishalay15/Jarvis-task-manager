import React, { useState } from 'react'
import clsx from "clsx";
import { PRIORITY_STYLES, TASK_TYPE } from "../utils";
import { ArchiveRestore, Trash } from 'lucide-react'
import { tasks } from "../assets/data";

const TASK_TYPE_TXT = {
    todo: "text-blue-600",
    "in progress": "text-orange-600",
    completed: "text-green-600",
}

function Trashed() {
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(null);
    const [type, setType] = useState("delete");
    const [selected, setSelected] = useState("");

    const deleteAllClick = () => {
        setType("deleteAll");
        setMsg("Do you want to permenantly delete all items?");
        setOpenDialog(true);
    };

    const restoreAllClick = () => {
        setType("restoreAll");
        setMsg("Do you want to restore all items in the trash?");
        setOpenDialog(true);
    };

    const deleteClick = (id) => {
        setType("delete");
        setSelected(id);
        setOpenDialog(true);
    };

    const restoreClick = (id) => {
        setSelected(id);
        setType("restore");
        setMsg("Do you want to restore the selected item?");
        setOpenDialog(true);
    };

    const TableHeader = () => (
        <thead className='border-b border-gray-300'>
            <tr className='text-black  text-left'>
                <th className='py-2'>Task Title</th>
                <th className='py-2'>Priority</th>
                <th className='py-2'>Stage</th>
                <th className='py-2 line-clamp-1'>Modified On</th>
            </tr>
        </thead>
    );

    const TableRow = ({ item }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    <div
                        className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
                    />
                    <p className='w-full line-clamp-2 text-base text-black'>
                        {item?.title}
                    </p>
                </div>
            </td>

            <td className='py-2 capitalize'>
                <div className={"flex gap-1 items-center"}>
                    <span className={clsx('', PRIORITY_STYLES[item?.priority])}>{item?.priority}</span>
                </div>
            </td>

            <td className={clsx('py-2 capitalize text-center md:text-start', TASK_TYPE_TXT[item?.stage])}>
                {item?.stage}
            </td>
            <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

            <td className='py-2 flex gap-1 justify-end'>
                <button
                    type="button"
                    className="px-3 py-2 outline-none"
                    onClick={() => restoreClick(item._id)}
                >
                    <ArchiveRestore className='text-xl text-gray-500' />
                </button>
                <button
                    type="button"
                    className="px-3 py-2 outline-none"
                    onClick={() => deleteClick(item._id)}
                >
                    <Trash className='text-xl text-red-600' />
                </button>
            </td>
        </tr>
    );

    return (
        <div className='w-full md:px-1 px-0 mb-6'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className="text-2xl font-semibold capitalize">
                    Trashed Tasks
                </h2>

                <div className='flex gap-2 md:gap-4 items-center'>
                    <button
                        type="button"
                        className="flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5 px-3 py-2 outline-none"
                        onClick={() => restoreAllClick()}
                    >
                        <span>Restore All</span>
                        <ArchiveRestore className='text-lg hidden md:flex' />
                    </button>
                    <button
                        type="button"
                        className="flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5 px-3 py-2 outline-none"
                        onClick={() => deleteAllClick()}
                    >
                        <span>Delete All</span>
                        <Trash className='text-lg hidden md:flex' />
                    </button>
                </div>
            </div>
            <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                <div className='overflow-x-auto'>
                    <table className='w-full mb-5'>
                        <TableHeader />
                        <tbody>
                            {tasks?.map((tk, id) => (
                                <TableRow key={id} item={tk} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Trashed
