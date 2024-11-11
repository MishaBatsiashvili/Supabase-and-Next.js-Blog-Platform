'use client'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

const AnimatePage: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatePage
