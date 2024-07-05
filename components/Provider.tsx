'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// eslint-disable-next-line camelcase
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type TAppRouter } from '@/server/routes'

export const trpc = createTRPCReact<TAppRouter>()

const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false // default: true
      }
    }
  }))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
          (op.direction === 'down' && op.result instanceof Error)
        }),
        unstable_httpBatchStreamLink({
          url: getUrl()
        })
      ]
    })
  )

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Provider
