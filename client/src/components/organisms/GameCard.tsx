import * as React from 'react'
import { cn } from '@/lib/utils'

interface GameCardProps {
  className?: string
  children: React.ReactNode
}

export default function GameCard({ className, children }: GameCardProps) {
  return <article className={cn('flex items-center rounded-xl p-5 md:p-6', className)}>{children}</article>
}

interface LeftProps {
  title: string
  children?: React.ReactNode
  className?: string
}

function Left({ className, title, children }: LeftProps) {
  return (
    <div className={cn('flex min-h-full flex-1 flex-col justify-between gap-10', className)}>
      <div className="flex flex-col">
        <p className="text-xs text-zinc-300 md:text-sm">Permainan</p>
        <h3 className="text-2xl font-semibold md:text-4xl">{title}</h3>
      </div>
      <div className="h-full items-center gap-3">{children}</div>
    </div>
  )
}

interface RightProps {
  className?: string
  src: string
  alt: string
}

function Right({ className, src, alt }: RightProps) {
  return <img src={src} alt={alt} className={cn('w-[200px]', className)} />
}

GameCard.Left = Left
GameCard.Right = Right
