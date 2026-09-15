import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-5xl font-medium text-indigo-600 mb-2">404</p>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
        Halaman tidak ditemukan
      </h1>
      <p className="text-zinc-500 mb-6 max-w-sm">
        Halaman yang kamu cari mungkin sudah dipindah atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="rounded-full bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
