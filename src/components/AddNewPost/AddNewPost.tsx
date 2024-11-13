'use client'
import React, { useState } from 'react'
import AddNewPostModal from './AddNewPostModal'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from '@/contexts/UserContext/UserContext'
import { Skeleton } from '@nextui-org/react'

const AddNewPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { user, userIsLoading } = useUser()

  return (
    <>
      {userIsLoading ? (
        <Skeleton className="inline-block rounded-md">
          <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
            New Post +
          </button>
        </Skeleton>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            className="rounded-md bg-violet-700 px-4 py-2 text-sm text-white font-bold"
            onClick={() => {
              setModalIsOpen(true)
            }}
          >
            New Post +
          </button>
        </motion.div>
      )}

      <AddNewPostModal
        {...{
          modalIsOpen,
          setModalIsOpen,
        }}
      />
    </>
  )
}

export default AddNewPost
