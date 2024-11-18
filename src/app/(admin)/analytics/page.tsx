import Link from 'next/link'
import UsersChart from './components/UsersChart'
import { createClient } from '@/utils/supabase/server'
import axios from 'axios'
import { headers } from 'next/headers'
import { PostsItem } from '@/app/api/analytics/posts-crud/route'

export default async function Page() {
  // console.log('origin', headers().forEach((value, key) => console.log(`${key}: ${value}}`)))
  const {
    data: { Items },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analytics/posts-crud`
  )

  console.log(Items)

  return (
    <main>
      <div className="text-center">
        <Link href={'/'} className="block">
          <button className="rounded-md bg-black px-3 py-2 text-sm text-white">
            Go Home
          </button>
        </Link>
      </div>

      <h1 className="mt-6 text-center text-xl font-bold">Website Analytics</h1>

      <p className="mt-6 text-center">
        This blog project collects user analytics data inside of{' '}
        <code className="code">AWS DynamoDB</code> and displays it here using{' '}
        <code className="code">Chart.js</code>
      </p>

      <div className="mt-12">
        <UsersChart Items={Items as PostsItem[]} />
      </div>
    </main>
  )
}
