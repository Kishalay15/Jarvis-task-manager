import React from 'react'
import { Plus } from 'lucide-react'
import clsx from 'clsx'

function TaskLabels({ label, bgType, textType, hoverType }) {
    return (
        <div className="w-full mb-4">
            <div className={clsx("w-full h-12 px-4 rounded-t-m flex items-center justify-between", bgType)}>
                <div className="flex gap-2 items-center">
                    <p className={clsx("text-base font-medium", textType)}>{label}</p>
                </div>
                <button className={clsx("cursor-pointer hidden md:flex items-center justify-center w-6 h-6 rounded-full", textType, hoverType)}>
                    <Plus size={18} />
                </button>
            </div>
        </div>
    )
}

export default TaskLabels
