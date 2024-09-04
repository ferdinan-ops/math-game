import { AuthGif } from '@/assets'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#0B0B22] tracking-wide">
      <div className="absolute left-[-447px] top-[98px] z-[2] h-[784px] w-[784px] rounded-full bg-[#FCA016]"></div>
      <div className="absolute left-[130px] top-[-27px] z-[1] h-[784px] w-[784px] rounded-full bg-[#16FCD2]"></div>
      <div className="absolute left-[482px] top-[-107px] z-[3] h-[784px] w-[784px] rounded-full bg-[#FC165B]"></div>
      <div className="blur-custom scroll-custom absolute inset-0 z-10 flex max-h-screen overflow-y-auto bg-[#0B0B22]/90">
        <section className="flex-1">
          <Outlet />
        </section>
        <section className="hidden lg:flex lg:flex-1">
          <img src={AuthGif} alt="auth" className="h-full w-full object-cover" draggable={false} />
        </section>
      </div>
    </main>
  )
}
