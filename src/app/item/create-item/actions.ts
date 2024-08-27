"use server";
import { revalidatePath } from "next/cache";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import  { getSignedUrlFromS3Object}  from "@/lib/S3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlFromS3Object(key, type);
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
  bidInterval,
  endDate
}: {
  fileName: string;
  name: string;
  startingPrice: number;
  bidInterval:number;
  endDate: Date
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  console.log(bidInterval);
  
  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id,
    bidInterval,
    endDate
  });

  redirect("/")
}