'use client'

function getItem (
  label: React.ReactNode,
  key: React.Key,
  onClick: (e: any) => void,
  icon?: React.ReactNode,
  children?: any[],
  type?: 'group'
) {
  return {
    key,
    onClick,
    icon,
    children,
    label,
    type
  }
}

const routes: { path: string; label: string }[] = [
  { path: 'use-state', label: 'useState' },
  { path: 'use-context', label: 'useContext' },
  { path: 'use-effect', label: 'useEffect' },
  { path: 'use-layout-effects', label: 'useLayoutEffect' },
  { path: 'use-callback', label: 'useCallback' },
  { path: 'use-memo', label: 'useMemo' },
  { path: 'use-deferred-value', label: 'useDeferredValue' },
  { path: 'use-id', label: 'useId' },
  { path: 'use-reducer', label: 'useReducer' },
  { path: 'use-ref', label: 'useRef' },
  { path: 'use-transition', label: 'useTransition' },
  { path: 'forward-ref', label: 'forwardRef' }
]

export const HooksMenu: FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [currentPageIndex, setCurrentPageKey] = useState(
    routes.findIndex(r => r.path === pathname.split('react-hooks/')[1]) || 0
  )

  const items = routes.map((item, index) =>
    getItem(item.label, item.path, () => {
      router.push(`/react-hooks/${item.path}`)
      setCurrentPageKey(index)
    })
  )

  return (
    <div className='flex flex-col flex-shrink-0 border-r border-gray-200 w-64 pr-4'>
      {items.map((item, index) => (
        <Button
          key={item.key}
          onClick={item.onClick}
          variant={currentPageIndex === index ? 'outline' : 'default'}
          className={
            cn(
              'mb-2'
            )
          }
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
