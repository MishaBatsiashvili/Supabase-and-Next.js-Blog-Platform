import { LayoutTransition } from '@/components/common/animation/LayoutTransition/LayoutTransition'
import Navbar from '@/components/Layout/Navbar/Navbar'
import { AnimatePresence } from 'framer-motion'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="p-5 h-full">
      <div className="mx-auto w-full h-full max-w-screen-lg">
        {children}
      </div>
    </div>
  )
}
