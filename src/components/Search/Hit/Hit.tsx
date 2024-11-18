import { Highlight } from 'react-instantsearch'
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils'
import Link from 'next/link'
import { BaseHit } from 'instantsearch.js'
import { Hit as HitType } from 'algoliasearch'
import { motion } from 'framer-motion'

// @ts-ignore
export const Hit: React.FC<{
  hit: HitType<BaseHit>
  setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ hit, setSearchIsActive }) => {
  return (
    <Link
      href={`/post/${hit.id}`}
      onClick={() => {
        setSearchIsActive(false)
      }}
      className="block w-full"
    >
      <motion.div
        className="grid w-full grid-cols-6 items-center gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        whileHover={{ x: 10, opacity: 0.8 }}
      >
        <div className="relative w-full">
          <div className="w-full pt-[90%]">
            <img
              src={hit.image_url}
              className="absolute left-0 top-0 block h-full w-full object-cover rounded-md"
              alt="search image"
            />
          </div>
        </div>

        <div className="col-span-5">
          <div className="text-md font-bold">
            <Highlight attribute="title" hit={hit} />
          </div>
          <div className="text-sm truncate-multi-line-1">
            <Highlight attribute="content" hit={hit} />
          </div>
          <div className="text-xs text-gray-500">
            Author: <Highlight attribute="author" hit={hit} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
