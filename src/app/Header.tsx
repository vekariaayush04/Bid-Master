import { auth } from "@/auth";
import SignIn  from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/auction.png"
export async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src={logo} width="30" height="50" alt="Logo" className="my-2 mr-2"/>
            Bid-Master
          </Link>

          <div>
            {session && (
              <Link
              href="/item/create-item"
              className="hover:underline flex items-center gap-1"
            >
              Auction an Item
            </Link>
            )}
          </div>
          <div>
            {session && (
              <Link
              href="/auctions"
              className="hover:underline flex items-center gap-1"
            >
              My Auctions
            </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}