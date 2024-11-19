import { Resolvers } from "@/__generated__/resolvers-types"
import { createClient } from "@/utils/supabase/server"
import axios from "axios"

export const s3uploadUrlResolver: NonNullable<Resolvers['Query']>['s3uploadUrl'] = async (_, args) => {
  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  if (!resp.data.user) {
    throw new Error('Not logged in')
  }

  const res = await axios.get<{ url: string }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/s3image-upload-url?objectKey=${args.objectKey}`
  )
  

  return res.data.url
}