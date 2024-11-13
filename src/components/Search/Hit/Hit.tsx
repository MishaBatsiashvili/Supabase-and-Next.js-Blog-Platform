import { Highlight } from 'react-instantsearch'
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils'
import Link from 'next/link'
import { BaseHit } from 'instantsearch.js'
import { Hit as HitType } from 'algoliasearch'

// @ts-ignore
export const Hit: React.FC<{
  hit: HitType<BaseHit>
  setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ hit, setSearchIsActive }) => {
  return (
    <Link href={`/post/${hit.id}`} onClick={() => {
      setSearchIsActive(false)
    }} className="block w-full">
      <div className="grid w-full grid-cols-6 gap-6">
        <div className="relative col-span-1 w-full pt-[65%]">
          <img
            src={hit.image_url}
            className="absolute left-0 top-0 block h-full w-full object-cover"
          />
        </div>
        <div className="col-span-5">
          <div className="font-bold text-md">
            <Highlight attribute="title" hit={hit} />
          </div>
          <div className="truncate-multi-line-1 text-sm">
            <Highlight attribute="content" hit={hit} />
          </div>
          <div className="text-xs text-gray-500">
            Author: <Highlight attribute="profiles.email" hit={hit} />
          </div>
        </div>
      </div>
    </Link>
  )
}
