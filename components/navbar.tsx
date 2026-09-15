import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-zinc-900 flex items-center gap-2"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600" />
          JobTracker
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/applications"
            className="text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            Lamaran Saya
          </Link>
          <Link
            href="/login"
            className="text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
