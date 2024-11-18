import { liteClient as algoliasearch } from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite.css'
import { Hits, InstantSearch, SearchBox, Configure } from 'react-instantsearch'
import { Hit } from './Hit/Hit'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
)

export const Search = () => {
  const [searchIsActive, setSearchIsActive] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchIsActive(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <InstantSearch searchClient={searchClient} indexName="posts_index">
      <Configure hitsPerPage={5} />
      <div ref={searchContainerRef} className="ais-InstantSearch">
        <SearchBox
          onClick={() => setSearchIsActive(true)}
          placeholder="Search Posts"
          className="py-0"
        />
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {searchIsActive && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{ opacity: 0 }}
                key={'search-hits'}
                className="absolute left-0 top-0 z-[999] w-full"
              >
                <Hits
                  hitComponent={({ hit }) => (
                    <Hit hit={hit} setSearchIsActive={setSearchIsActive} />
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </InstantSearch>
  )
}
