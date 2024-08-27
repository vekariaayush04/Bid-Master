import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import img from '@/app/auctions/package.svg'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center h-full'>
        <Image src={img} alt='item' width={200} height={200}></Image>
        <h2 className='text-xl font-bold'>No Items to Auction</h2>
        <Button>
            <Link href={"/item/create-item"}>Create Auction</Link>
        </Button>
    </div>
  )
}

export default EmptyState