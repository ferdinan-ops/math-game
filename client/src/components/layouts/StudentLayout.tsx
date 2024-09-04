import { Outlet } from 'react-router-dom'
import { StudentHeader } from '../organisms'
import { ScrollArea } from '../ui/scroll-area'

export default function StudentLayout() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0B22] tracking-wide">
      <div className="absolute left-[-247px] top-[98px] z-[2] h-[784px] w-[784px] rounded-full bg-[#FCA016]"></div>
      <div className="absolute left-[330px] top-[-27px] z-[1] h-[784px] w-[784px] rounded-full bg-[#16FCD2]"></div>
      <div className="absolute left-[682px] top-[-107px] z-[3] h-[784px] w-[784px] rounded-full bg-[#FC165B]"></div>
      <div className="blur-custom absolute inset-0 z-10 h-full bg-[#0B0B22]/90">
        <StudentHeader />
        <ScrollArea className="h-[calc(100vh-80px-48px-40px)] w-full md:mx-auto md:mt-6 md:w-6/12">
          <div className="relative flex w-full flex-col p-6 md:p-0">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </main>
  )
}
