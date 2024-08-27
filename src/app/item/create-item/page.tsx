"use client";

import {
  createItemAction,
  createUploadUrlAction,
} from "@/app/item/create-item/actions";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function CreatePage() {
  const [date, setDate] = React.useState<Date>(new Date())
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Auction
         an Item</h1>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });

          const name = formData.get("name") as string;
          const startingPrice = parseFloat(
            formData.get("startingPrice") as string
          );
          const bidInterval = parseFloat(
            formData.get("bidInterval") as string
          );
          const startingPriceInPaisa = Math.floor(startingPrice * 100);
          const bidIntervalInPaisa = Math.floor(bidInterval * 100)
          await createItemAction({
            name,
            startingPrice: startingPriceInPaisa,
            fileName: file.name,
            bidInterval:bidIntervalInPaisa,
            endDate: date
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input
          required
          className="max-w-lg"
          name="bidInterval"
          type="number"
          step="0.01"
          placeholder="what is the interval of the bid"
        />
        <Input type="file" name="file"></Input>
        <DatePicker date={date} setDate={setDate}/>
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  )
}