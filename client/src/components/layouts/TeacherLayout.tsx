import * as React from 'react'
import { TeacherHeader } from '../organisms'
import { Outlet } from 'react-router-dom'

export default function TeacherLayout() {
  return (
    <React.Fragment>
      <TeacherHeader />
      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col p-6 tracking-wide md:px-0 md:py-12">
        <Outlet />
      </main>
    </React.Fragment>
  )
}
