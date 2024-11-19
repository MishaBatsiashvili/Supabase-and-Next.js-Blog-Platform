import { LayoutTransition } from '@/components/common/animation/LayoutTransition/LayoutTransition'
import Navbar from '@/components/Layout/Navbar/Navbar'
import { AnimatePresence } from 'framer-motion'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="px-5">
      <Navbar />
      <div className="mx-auto w-full max-w-screen-lg flex-1">
        <LayoutTransition
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
        >
          {children}
        </LayoutTransition>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";
