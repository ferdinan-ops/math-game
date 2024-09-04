import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { AvatarsMan, AvatarsWoman } from '@/assets'

import * as React from 'react'
import { HiUser } from 'react-icons/hi2'

interface AvatarProps {
  value: string
  onChange: (value: string) => void
}

export default function Avatar({ value, onChange }: AvatarProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center gap-3">
          {value ? (
            <img src={value} alt="avatar" className="w-32" />
          ) : (
            <div className="flex h-28 w-28 rounded-lg border-4 border-white/20  bg-white/5">
              <HiUser className="m-auto text-7xl text-white/20" />
            </div>
          )}
          <Button variant="glasses" className="text-xs font-medium" type="button">
            Pilih Avatar
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="border-white/10 bg-[#0B0B22] data-[state=open]:text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Pilih Avatarmu</DialogTitle>
          <DialogDescription className="text-[13px] font-medium text-white/60">
            Pilih avatar yang kamu sukai, avatar ini akan digunakan sebagai identitas kamu
          </DialogDescription>
        </DialogHeader>

        <section className="scroll-custom grid max-h-[calc(100vh-250px)] grid-cols-2 gap-8 overflow-y-auto border-t border-white/10 pt-3 md:max-h-none md:grid-cols-5 md:overflow-visible md:overscroll-none">
          {[...AvatarsMan, ...AvatarsWoman].map((avatar, index) => (
            <img
              src={avatar}
              key={index}
              className="cursor-pointer xl:transition-transform xl:hover:scale-125"
              onClick={() => {
                onChange(avatar)
                setOpen(false)
              }}
            />
          ))}
        </section>
      </DialogContent>
    </Dialog>
  )
}
