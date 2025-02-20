import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Plus } from 'lucide-react';
import TaskLabels from '../components/task/TaskLabels';
import TaskCard from '../components/TaskCard'
import { summary } from '../assets/data'
import AddTask from "../components/task/AddTask";

const TASK_TYPE_BG = {
    todo: "bg-blue-50",
    "in progress": "bg-[#FFF3E0]",
    completed: "bg-[#F1F8F1]",
};
const TASK_TYPE_TEXT = {
    todo: "text-blue-600",
    "in progress": "text-[#D48806]",
    completed: "text-[#1E4620]",
}
const TASK_TYPE_HOVER = {
    todo: "hover:bg-blue-100",
    "in progress": "hover:bg-orange-100",
    completed: "hover:bg-green-100",
}

function Tasks() {
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const status = params?.status || "";
    const { user } = useSelector((state) => state.auth);

    console.log("Current user:", user);

    const userTasks = user?.role === "Admin" ? summary.last10Task : summary.last10Task.filter(task => {
        if (!user) return false;
        return Array.isArray(task.team) && task.team.some(member => member._id === user._id);
    });

    console.log("Filtered tasks count:", userTasks.length);

    const todoTasks = userTasks.filter(task => task.stage === 'todo');
    const inProgressTasks = userTasks.filter(task => task.stage === 'in progress');
    const completedTasks = userTasks.filter(task => task.stage === 'completed');

    const filteredTasks = status ? userTasks.filter(task => task.stage === status.toLowerCase()) : null;

    return loading ? (
        <div className='py-10'>
            <Loader />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="flex items-center justify-between mb-4 text-2xl font-semibold capitalize">
                    {status ? `${status} Tasks` : "My Tasks"}
                </h2>
                {!status && (
                    <button
                        type="button"
                        className="px-3 outline-none flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                        onClick={() => setOpen(true)}
                    >
                        <span>Create Task</span>
                        <Plus />
                    </button>
                )}
            </div>
            <div>
                {!status && (
                    <div className='flex gap-8 mb-6'>
                        <TaskLabels
                            label={"To Do"}
                            bgType={TASK_TYPE_BG.todo}
                            textType={TASK_TYPE_TEXT.todo}
                            hoverType={TASK_TYPE_HOVER.todo}
                            count={todoTasks.length}
                        />
                        <TaskLabels
                            label={"In Progress"}
                            bgType={TASK_TYPE_BG['in progress']}
                            textType={TASK_TYPE_TEXT['in progress']}
                            hoverType={TASK_TYPE_HOVER['in progress']}
                            count={inProgressTasks.length}
                        />
                        <TaskLabels
                            label={"Completed"}
                            bgType={TASK_TYPE_BG.completed}
                            textType={TASK_TYPE_TEXT.completed}
                            hoverType={TASK_TYPE_HOVER.completed}
                            count={completedTasks.length}
                        />
                    </div>
                )}

                {status ? (
                    <div className='space-y-4'>
                        {filteredTasks && filteredTasks.length > 0 ? (
                            filteredTasks.map((task, index) => (
                                <TaskCard task={task} key={index} />
                            ))
                        ) : (
                            <p className="text-gray-500">No {status.toLowerCase()} tasks found for you.</p>
                        )}
                    </div>
                ) : (
                    <div className='flex gap-9 2xl:gap-10'>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {todoTasks.length > 0 ? (
                                    todoTasks.map((task, index) => (
                                        <TaskCard task={task} key={index} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No to-do tasks assigned to you.</p>
                                )}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {inProgressTasks.length > 0 ? (
                                    inProgressTasks.map((task, index) => (
                                        <TaskCard task={task} key={index} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No in-progress tasks assigned to you.</p>
                                )}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {completedTasks.length > 0 ? (
                                    completedTasks.map((task, index) => (
                                        <TaskCard task={task} key={index} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No completed tasks assigned to you.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <AddTask open={open} setOpen={setOpen} />
        </div>
    )
}

export default Tasks
