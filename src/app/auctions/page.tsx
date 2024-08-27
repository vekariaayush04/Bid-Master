import React from "react";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import ItemCard from "@/components/ui/item-card";
import { eq } from "drizzle-orm";
import EmptyState from "./empty-state";

const MyAuctionsPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorised");
  }

  const userId = String(session?.user?.id);
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, userId),
  });
  
  const hasItems = allItems.length > 0
  return (
    <main className="container mx-auto py-8 h-96">
      <h2 className="text-3xl font-bold my-4">Your Items</h2>
      {hasItems? (
        <div className="grid grid-cols-1 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allItems.map((item, index) => (
            <div className="flex justify-center items-center m-3" key={index}>
            <ItemCard key={item.id} item={item} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState/>
      )}
    </main>
  );
};

export default MyAuctionsPage;
