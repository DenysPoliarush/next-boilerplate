'use client'

import { Prisma } from '@prisma/client'

type TTaskWithUser = Prisma.ToDoRecordGetPayload<{
  include: { user: true }
}>

interface IProps {
  className?: string
  task: TTaskWithUser
}

export const TaskItem: FC<IProps> = ({
  className,
  task
}) => {
  const [isCompleted, setCompleted] = useState(task.completed || false)

  const updateTask = trpc.tasks.updateTask.useMutation()

  function toggleCompleted (value: boolean) {
    updateTask.mutateAsync({
      id: task.id,
      completed: value
    })
      .then(res => {
        console.log(res)
        setCompleted(value)
      })
      .catch(err => {
        toast(err.message)
      })
  }

  return (
    <Link
      href={`/tasks/${task.id}`}
      className={cn(
        'flex items-center border border-grey-100 shadow-md hover:shadow-lg cursor-pointer rounded-md p-2 mt-2',
        className
      )}>
      <div className={cn('flex items-center', task.completed && 'line-through text-gray-400')}>
        <p>{task.title}</p>
      </div>

      <div className='flex items-center ml-auto' onClick={(e) => e.preventDefault()}>
        <UserBadge className='mr-2' user={task.user} showName={false} size={22} />

        <div onClick={() => toggleCompleted(!isCompleted)} className='mr-2'>
          {isCompleted
            ? (
              <IconChecked className='fill-current text-green-500 w-5 h-5'/>
            )
            : (
              <IconUnchecked className='fill-current text-gray-500 w-5 h-5' />
            )}
        </div>

        <TaskMenu className='opacity-80 hover:opacity-100' task={task} updateTask={toggleCompleted} />
      </div>
    </Link>
  )
}
