import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import ItemCard from "@/components/ui/item-card";

export default async function HomePage() {
  const session = await auth();

  const allItems = await database.select().from(items).execute();
  return (
    <main className="container mx-auto">
      <h2 className="text-3xl font-bold my-10">Items For Sale </h2>
      <div className="grid grid-cols-1 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allItems.map((item, index) => (
          <div className="flex justify-center items-center m-3" key={index}>
          <ItemCard key={item.id} item={item} />
          </div>
        ))}
      </div>
    </main>
  );  
}
