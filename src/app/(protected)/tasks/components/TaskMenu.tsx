'use client'

import { FC } from 'react'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { copyText, cn } from '~/core/helpers'

interface IProps {
  className?: string
  task: any // TODO: use type PrismaToDoRecord from prisma or trpc
  updateTask: (value: boolean) => void
}

export const TaskMenu: FC<IProps> = ({ className, task, updateTask }) => {
  function completeTask () {
    updateTask(!task.completed)
    toast(!task.completed ? 'Completed' : 'Unfinished')
  }

  function deleteTask () {
    console.log('delete')
  }

  function toggleEdit () {
    console.log('edit')
  }

  function copyLink () {
    const url = new URL(`${window.location.origin}/tasks/${task.id}`).toString()
    copyText(url, () => toast('Copied'))
  }

  return (
    <div className={cn('', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={toggleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={completeTask}>{task.completed ? 'Re-open' : 'Complete'}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteTask}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
