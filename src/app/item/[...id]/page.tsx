import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { getImageUrl } from "@/utils/getImageUrl";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import notfoundimg from "./notfound.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistance, subDays } from "date-fns";
import { formatRupee } from "@/utils/currency";
import { createBidsAction } from "./actions";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";

function formatDateTime(date : Date){
  return formatDistance(date, new Date(), { addSuffix: true })
}

export default async function ItemPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const session = await auth();


  //const allItems = await database.select().from(items).execute();
  const item = await database.query.items.findFirst({
    where: eq(items.id, id),
  });

  if (!item) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-[600px]">
          <Image src={notfoundimg} alt="item" height={400} width={400}></Image>
          <h1 className="text-3xl font-semibold mt-7">No Item Found</h1>
          <Button className="mt-7">
            <Link href={"/"}>Go Back To DashBoard</Link>
          </Button>
        </div>
      </>
    );
  }

  // const bids = [
  //   {
  //     id: 1,
  //     amount: 100,
  //     userName: "Ayush Doe",
  //     date: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 100,
  //     userName: "John Doe",
  //     date: new Date(),
  //   },
  //   {
  //     id: 3,
  //     amount: 100,
  //     userName: "John Doe",
  //     date: new Date(),
  //   },
  // ];

  const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId, id),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          name: true
        }
      }
    }
  })
  const isBidEnded = new Date() > new Date(item.endDate)
  const hasBids = allBids.length > 0
  const allowedToBid = (session?.user?.id !==  item.userId && session && !isBidEnded)
  
  return (
    <main className="container mx-auto">
      <div className="md:flex">
        <div className="">
          <h2 className="text-4xl my-10">Auction for <span className="font-bold">{item?.name}</span></h2>
          
          <Image
            className="rounded-xl"
            src={getImageUrl(String(item?.fileKey))}
            alt="image"
            height={400}
            width={400}
          ></Image>
          <p className="text-lg mb-4 mt-10 ml-1">
            Current Bid: <span className="font-bold">₹{formatRupee(item.currentBid +item.startingPrice )}</span>
          </p>
          <p className="text-lg mb-4 mt-2 ml-1">
            Starting Price: <span className="font-bold">₹{formatRupee(item.startingPrice)}</span>
          </p>
          <p className="text-lg mb-4 mt-2 ml-1">
            Bid Interval: <span className="font-bold">₹{formatRupee(item.bidInterval)}</span>
          </p>
        </div>
        <div className="flex-1">
          {hasBids ? (
            <div>
              <div className="flex justify-between">
              <h2 className="font-semibold text-3xl mx-10 mt-10 mb-4">Current Bids</h2>
              {allowedToBid && (
              <div><form action={createBidsAction.bind(null, id)}>
               <Button className="mt-7">
                  Add Bid
                </Button>
               </form></div>
               )
              }
              {isBidEnded && (
            <div className="mt-5">
              <Badge variant="destructive" className="m-3 h-8 ">Bid Over</Badge>
            </div>
          )}
              </div>
              
              <div className="flex flex-col space-y-2 gap-5">
                {allBids.map((bid:any) => (
                  <div key={bid.id} className="bg-gray-100 p-3 ml-10 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span className="font-bold text-lg">₹{formatRupee(bid.amount)}</span>
                    <span className="mx-2 text-gray-600">by</span>
                    <span className="font-semibold">{bid.user.name}</span>
                    <span className="block text-sm text-gray-500 mt-1">{formatDateTime(bid.timestamp)}</span>
                  </div>
                ))}
              </div>
              </div>
              ) : (
              <div className="flex flex-col items-center justify-center  bg-slate-100 m-16 h-96 rounded-3xl">
                <Image src={notfoundimg} alt="item" height={300} width={300}></Image>
                <h1 className="text-3xl font-semibold mt-7">No Bids Found</h1>
                {allowedToBid && (
               <form action={createBidsAction.bind(null, id)}>
               <Button className="mt-7">
                  Add Bid
                </Button>
               </form>
               )}
              </div>
              )}
          </div>
        
      </div>
    </main>
  );
}