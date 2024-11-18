import axios from 'axios'

export type PostsItem = {
  user_id: string
  'resource_type#timestamp': string
  crud_action: string
  'crud_action#timestamp': string
  data: {
    additionalInfo: string
    content: string
  }
  timestamp: number
  resource_type: string
  resource_id: string
}

export async function handler(request: Request) {
  try {
    const res = await axios.get(
      'https://80v7anbjj0.execute-api.eu-central-1.amazonaws.com/default/UserCrudAnalyticsApi'
    )
    // console.log('res', res.data.Items)
    return Response.json({ Items: res.data.Items as PostsItem[] })
  } catch (err) {
    // console.log('err', err)
    return Response.json({ message: err })
  }
}

export { handler as GET }
