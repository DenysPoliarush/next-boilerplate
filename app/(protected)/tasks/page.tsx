import { unstable_noStore as noStore } from 'next/cache'

const Tasks: React.FC = async () => {
  noStore()

  const { tasks } = await trpcServer.tasks.getTasks.query()

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl mb-4'>Tasks</h1>
        <AddTask />
      </div>

      <div>
        <TaskList tasks={tasks} />
      </div>
    </div>
  )
}

export default Tasks
