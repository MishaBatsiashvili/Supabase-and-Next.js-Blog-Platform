'use client'
import { useUser } from '@/contexts/UserContext/UserContext'
import {
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from '@/components/Search/Search'

const Navbar: React.FC = () => {
  const { user, signOut, userIsLoading } = useUser()
  const pathname = usePathname()

  const renderUser = () => {
    if (!user) {
      return (
        <Link href={'/auth/login'} className="block">
          <button className="rounded-md bg-black px-5 py-1.5 text-sm text-white">
            Sign In
          </button>
        </Link>
      )
    }

    return (
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <div className="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5">
            {user?.email}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <button
              onClick={async () => {
                await signOut()
              }}
              className="w-[150px] rounded-md bg-black px-3 py-2 text-sm text-white"
            >
              Sign Out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  const renderNavbarSkeleton = () => {
    return (
      <motion.div
        key={'navbar-skeleton'}
        exit={{ opacity: 0 }}
        className="mx-auto w-full max-w-screen-lg py-8"
      >
        <Skeleton className="flex w-full rounded-sm">
          <div className="rounded-md border border-gray-300 text-sm">
            Loading...
          </div>
          <input placeholder="search posts" className="text-sm" />
        </Skeleton>
      </motion.div>
    )
  }

  const renderNavbarView = () => {
    return (
      <motion.div
        key={'navbar'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto my-8 flex w-full max-w-screen-lg items-center justify-between rounded-md border border-gray-300 px-3 py-3"
      >
        {renderUser()}
        <div className="flex-grow px-6">
          <Search />
        </div>

        {/* <div className="text-sm">
          <Link href="/" className="mr-3">
            Home
          </Link>
          <Link href="/blog" className="mr-3">
            Blog
          </Link>
          <Link href="/newsletter" className="mr-3">
            My Posts
          </Link>
          <Link href="/about" className="mr-3">
            About
          </Link>

          <input type="checkbox" name="isDarkMode" />
        </div> */}
      </motion.div>
    )
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {!userIsLoading ? renderNavbarView() : renderNavbarSkeleton()}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
