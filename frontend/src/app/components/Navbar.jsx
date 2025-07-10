import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex gap-6 shadow-md">
      <Link href="/" className="hover:text-blue-300 font-bold text-lg">Home</Link>
      <Link href="/users" className="hover:text-blue-300">Users</Link>
      <Link href="/portfolios" className="hover:text-blue-300">Portfolios</Link>
      <Link href="/company" className="hover:text-blue-300">Companies</Link>
    </nav>
  );
}
