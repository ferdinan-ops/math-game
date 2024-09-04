import { Logo, LogoLight } from '@/assets'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface BrandProps {
  className?: string
  imageClassName?: string
  type?: 'dark' | 'light'
  href?: string
}

export default function Brand({ className, imageClassName, href, type = 'dark' }: BrandProps) {
  return (
    <Link
      to={href ?? '/'}
      className={cn(
        'flex items-center gap-4 font-semibold',
        type === 'dark' ? 'text-white' : 'text-primary',
        className
      )}
    >
      <img src={type === 'dark' ? Logo : LogoLight} alt="logo" className={cn('w-5', imageClassName)} />
      <span>Sigma Math.</span>
    </Link>
  )
}
