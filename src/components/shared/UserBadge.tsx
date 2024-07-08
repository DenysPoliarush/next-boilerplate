'use client'

import { FC } from 'react'
import { cn } from '~/core/helpers'
import NextImage from 'next/image'

interface IProps {
  className?: string
  user: any // TODO: fix type Partial<PrismaUser>
  size?: number
  showName?: boolean
}

export const UserBadge: FC<IProps> = ({ className, user, size = 32, showName }) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {user?.image
        ? (
          <NextImage
            src={user.image}
            alt='User profile'
            className='rounded-full'
            width={size}
            height={size}
          />
        )
        : (
          <div
            className='border border-black rounded-full text-xxs font-semibold table text-center'
            style={{ width: `${size}px`, height: `${size}px` }}>

            <span className='leading-none align-middle table-cell'>
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

      {showName && <p>{user?.name}</p>}
    </div>
  )
}
