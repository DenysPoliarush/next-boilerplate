'use client'

import { FC } from 'react'
import { cn } from '~/core/helpers'
import { TaskItem } from './TaskItem'

interface IProps {
  className?: string
  tasks: any[]
}

export const TaskList: FC<IProps> = ({ className, tasks }) => {
  return (
    <div className={cn('', className)}>
      {tasks.length > 0 && (
        tasks.map(task => {
          return (
            <TaskItem task={task} key={task.id} />
          )
        })
      )}
    </div>
  )
}
