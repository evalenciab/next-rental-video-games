'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
	const {data: session} = useSession();
  return (
    <nav className="p-4 bg-white shadow-md flex justify-between">
      <div className="flex gap-4">
		<Link href="/">Home</Link>
		<Link href="/games">Games</Link>
	  </div>
	  <div>
		{
			session ? (
				<div className="flex gap-2 items-center">
					<span>{session.user?.name}</span>
					<Button onClick={() => signOut()} className="bg-red-500">Sign Out</Button>
				</div>
			) : (
				<Button onClick={() => signIn('google')} className="bg-blue-500">Sign In</Button>
			)
		}
	  </div>
    </nav>
  );
}
