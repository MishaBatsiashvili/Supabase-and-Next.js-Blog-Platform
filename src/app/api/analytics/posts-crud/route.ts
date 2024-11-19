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
  switch(request.method){
    case 'GET':
      try {
        const res = await axios.get(
          'https://80v7anbjj0.execute-api.eu-central-1.amazonaws.com/default/UserCrudAnalyticsApi'
        )
        return Response.json({ Items: res.data.Items as PostsItem[] })
      } catch (err) {
        return Response.json({ message: err }, {status: 400})
      }
    case 'POST':
      const requestBody = await request.json()
      console.log('requestBody', requestBody)
      try {
        const res = await axios.post(
          'https://80v7anbjj0.execute-api.eu-central-1.amazonaws.com/default/UserCrudAnalyticsApi',
          requestBody
        )
        console.log(res)
        return Response.json(res.data)
      } catch (err) {
        console.log(err)
        return Response.json(err, { status: 400})
      }
  }
}

export { handler as GET, handler as POST }
