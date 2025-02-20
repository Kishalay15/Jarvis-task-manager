import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { Plus } from 'lucide-react';
import TaskLabels from '../components/task/TaskLabels';
import TaskCard from '../components/TaskCard'
import { tasks } from '../assets/data'
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
    const [selected, setSelected] = useState(0)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const status = params?.status || "";

    const todoTasks = tasks.filter(task => task.stage === 'todo');
    const inProgressTasks = tasks.filter(task => task.stage === 'in progress');
    const completedTasks = tasks.filter(task => task.stage === 'completed');

    const filteredTasks = status ? tasks.filter(task => task.stage === status.toLowerCase()) : null;

    return loading ? (
        <div className='py-10'>
            <Loader />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="flex items-center justify-between mb-4 text-2xl font-semibold capitalize">
                    {status ? `${status} Tasks` : "Tasks"}
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
                        <TaskLabels label={"To Do"} bgType={TASK_TYPE_BG.todo} textType={TASK_TYPE_TEXT.todo} hoverType={TASK_TYPE_HOVER.todo} />
                        <TaskLabels label={"In Progress"} bgType={TASK_TYPE_BG['in progress']} textType={TASK_TYPE_TEXT['in progress']} hoverType={TASK_TYPE_HOVER['in progress']} />
                        <TaskLabels label={"Completed"} bgType={TASK_TYPE_BG.completed} textType={TASK_TYPE_TEXT.completed} hoverType={TASK_TYPE_HOVER.completed} />
                    </div>
                )}

                {status ? (
                    <div className='space-y-4'>
                        {filteredTasks.map((task, index) => (
                            <TaskCard task={task} key={index} />
                        ))}
                    </div>
                ) : (
                    <div className='flex gap-9 2xl:gap-10'>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {todoTasks.map((task, index) => (
                                    <TaskCard task={task} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {inProgressTasks.map((task, index) => (
                                    <TaskCard task={task} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='space-y-4'>
                                {completedTasks.map((task, index) => (
                                    <TaskCard task={task} key={index} />
                                ))}
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
