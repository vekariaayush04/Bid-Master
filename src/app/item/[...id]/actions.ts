"use server"
import { database } from "@/db/database"
import { auth } from "@/auth"
import { bids, items } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

export async function createBidsAction(id:number){
    
    const session = await auth()

    if(!session || !session.user){
        return {
            error: "Unauthorized"
        }
    }

    const item = await database.query.items.findFirst({
        where: eq(items.id, id)
    })
    
    if(!item){
        return {
            error: "Item not found"
        }
    }
    const userId = String(session.user.id)
    
    const latestBid = item.currentBid + item.bidInterval

    await database.insert(bids).values({
        userId : userId,
        itemId: id,
        amount: latestBid,
        timestamp: new Date()
    })

    await database.update(items).set({
        currentBid: latestBid
    }).where(eq(items.id, id))

    revalidatePath(`/item/${id}`)
}