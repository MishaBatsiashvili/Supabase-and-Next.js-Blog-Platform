import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Hit as AlgoliaHit } from 'algoliasearch'
import { BaseHit } from 'instantsearch.js'
import { Highlight } from 'react-instantsearch'

interface ExtendedBaseHit extends BaseHit {
  image_url: string
  title: string
  content: string
  author: string
  __position: number // Including __position to satisfy the expected type
}

export const Hit: React.FC<{
  hit: AlgoliaHit<BaseHit>
  setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ hit, setSearchIsActive }) => {
  return (
    <Link
      href={`/post/${hit.objectID}`} // Ensure you are using objectID since hit.id might not be correct
      onClick={() => setSearchIsActive(false)}
      className="block w-full"
    >
      <motion.div
        className="grid w-full grid-cols-6 items-center gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        whileHover={{ x: 10, opacity: 0.8 }}
      >
        <div className="relative w-full">
          <div className="relative w-full pt-[90%]">
            <Image
              src={hit.image_url}
              alt="search image"
              layout="fill"
              objectFit="cover"
              className="absolute left-0 top-0 block rounded-md"
            />
          </div>
        </div>

        <div className="col-span-5">
          <div className="text-md font-bold">
            {/* @ts-ignore */}
            <Highlight attribute="title" hit={hit} />
          </div>
          <div className="text-sm truncate-multi-line-1">
            {/* @ts-ignore */}
            <Highlight attribute="content" hit={hit} />
          </div>
          <div className="text-xs text-gray-500">
            {/* @ts-ignore */}
            Author: <Highlight attribute="author" hit={hit} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
