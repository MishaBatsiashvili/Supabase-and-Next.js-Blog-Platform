import { liteClient as algoliasearch } from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite.css'
import { Hits, InstantSearch, SearchBox, Configure } from 'react-instantsearch'
import { Hit } from './Hit/Hit'
import { useState, useEffect, useRef } from 'react'

const searchClient = algoliasearch(
  'W0CLLV2GZS',
  '14c838a829dfc946ee5349d88c07c78e'
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
          {searchIsActive && (
            <div className="absolute left-0 top-0 z-[999] w-full">
              <Hits
                hitComponent={({ hit }) => (
                  <Hit hit={hit} setSearchIsActive={setSearchIsActive} />
                )}
              />
            </div>
          )}
        </div>
      </div>
    </InstantSearch>
  )
}
