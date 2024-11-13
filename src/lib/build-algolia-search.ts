import { getS3ImageUrl } from '@/utils/helpers/getS3ImageUrl'
import { createClient } from '@/utils/supabase/client'
import { searchClient } from '@algolia/client-search'

const APP_ID = process.env.ALGOLIA_APP_ID!
const API_KEY = process.env.ALGOLIA_API_KEY!
const client = searchClient(APP_ID, API_KEY)

// Fetch and index objects in Algolia
const processRecords = async () => {
  const supabse = createClient()
  const { data, error } = await supabse.from('posts').select('id, title, content, s3_image_object_key, profiles(email)')
  if(error){
    throw new Error(error.message)
  }
  
  const finalData = data.map(post => ({
    ...post,
    image_url: getS3ImageUrl(post.s3_image_object_key)
  }))

  // const datasetRequest = await fetch(
  //   'https://dashboard.algolia.com/sample_datasets/movie.json'
  // )
  // const movies = await datasetRequest.json()

  return await client.saveObjects({
    indexName: 'posts_index',
    objects: finalData,
  })
}

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err))
