import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-white shadow-md flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/games">Games</Link>
    </nav>
  );
}
