import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export default async function Page() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <Card>
        <CardBody className="p-6">
          <p>Access is restricted for this user</p>
          <Link href={'/'} className='block'>
            <button className="w-full mt-4 rounded-md bg-black px-3 py-2 text-sm text-white">
              Go Home
            </button>
          </Link>
        </CardBody>
      </Card>
    </main>
  )
}
