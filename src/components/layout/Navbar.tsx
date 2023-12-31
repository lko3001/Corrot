import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-4 py-3 dark:bg-iced-night sticky top-0">
      <Link href="/">Home</Link>
      <Link href="/signin">signin</Link>
    </nav>
  );
}
