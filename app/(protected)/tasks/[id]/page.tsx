import { Metadata } from 'next'
import { cache } from 'react'

type TParams = {
  params: {id: string}
}

const getTasks = cache((id: number) => {
  console.log('called getPost()')
  return trpcServer.tasks.getTaskById.query({ id })
})

export async function generateMetadata (
  { params }: TParams
): Promise<Metadata> {
  const { task } = await getTasks(+params.id)

  return {
    title: `Task ${task?.title}`
  }
}

export default async function Tasks ({ params }: TParams) {
  const { task } = await getTasks(+params.id)

  return (
    <div>
      <h1 className='font-bold text-2xl mb-4'>Tasks {task?.title}</h1>
      <p>{task?.subtitle}</p>
    </div>
  )
}
