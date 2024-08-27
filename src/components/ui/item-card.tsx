import React from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/utils/getImageUrl'
import { Button } from './button';
import Link from 'next/link';
import { formatRupee } from '@/utils/currency';
import { format } from 'date-fns';
import { Badge } from './badge';

type ItemCardProps = {
    id: number;
    fileKey: string;
    name: string;
    startingPrice: number;
    endDate: Date;
}

const ItemCard = ({ item } : { item : ItemCardProps}) => {

  const isBidEnded = new Date() > new Date(item.endDate)

  return (
    
    <div className="border p-4 rounded-xl  items-center w-60 h-84  duration-300 hover:shadow-lg hover:scale-105">
      <div className="w-48 h-48 relative mb-4">
        <Image
          src={getImageUrl(item.fileKey)}
          alt={item.name}
            fill
        //   height={200}
        //   width={200}
          style={{ objectFit:"cover" }}
          className="rounded-lg mx-2 "
        />
      </div>
      <h2 className="flex justify-start mt-2  text-lg font-bold ">{item.name}</h2>
      <div className="mt-1">Current Bid : ₹{formatRupee(item.startingPrice)}</div>
      <div className="mt-1">End Date : {format(item.endDate,"eee dd/M/yyyy")}</div>
      <div className='flex justify-between items-center'>
      <Button asChild className='mt-3' variant={isBidEnded ? "outline" : "default"}><Link href={`item/${item.id}`}>Show Bids</Link></Button>
      <Badge variant="destructive" className={isBidEnded ? "h-7 mt-3" : "h-7 mt-3 bg-green-600 hover:bg-green-600"} >{isBidEnded ? "ended" : "live"}</Badge>
      </div>
    </div>
  )
}

export default ItemCard