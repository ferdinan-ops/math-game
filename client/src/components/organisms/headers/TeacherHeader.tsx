import { Brand, Image } from '@/components/atoms'
import { TeacherType } from '@/lib/types/teacher.type'
import { cn } from '@/lib/utils'
import * as TeacherServer from '@/store/server/useTeacher'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TeacherHeader() {
  const navigate = useNavigate()
  const { data: teacher } = TeacherServer.useGetMe()

  return (
    <header className="flex h-20 w-full items-center bg-primary text-white">
      <nav className="mx-auto flex w-[1180px] items-center justify-between px-5 md:px-10 xl:px-0">
        <Brand
          imageClassName="xl:w-6 w-5"
          className="gap-3 text-lg font-medium xl:gap-4 xl:text-xl"
          href="/teacher/game"
        />

        <div className="relative w-fit">
          <ProfileBox isHidden user={teacher as TeacherType} onClick={() => navigate('/teacher/profile')} />
        </div>
      </nav>
    </header>
  )
}

interface ProfileBoxProps {
  onClick?: () => void
  children?: React.ReactNode
  user: TeacherType
  className?: string
  isHidden?: boolean
}

function ProfileBox({ user, onClick, children, className, isHidden }: ProfileBoxProps) {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-row-reverse items-center gap-3.5 rounded-full bg-white tracking-wide text-dark hover:bg-zinc-100 xl:rounded-md xl:px-4 xl:py-2',
        className
      )}
      onClick={() => onClick && onClick()}
    >
      <Image src={user?.photo} alt={user?.fullname} className="h-10 w-10 rounded-full" />
      <div className={cn('flex max-w-[170px] flex-col', isHidden && 'hidden lg:flex')}>
        <h3 className="truncate text-sm font-semibold text-dark">{user?.username}</h3>
        <p className="truncate text-xs text-dark/50">{user?.email}</p>
      </div>
      {children}
    </div>
  )
}
