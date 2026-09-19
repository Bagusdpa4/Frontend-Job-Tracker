import Link from "next/link";
import ApplicationForm from "@/components/applications/application-form";
import { FiArrowLeft } from "react-icons/fi";

export default function NewApplicationPage() {
  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <Link
        href="/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <FiArrowLeft size={20} />
        Kembali ke list
      </Link>

      <h1 className="text-2xl font-semibold hover:shadow-sm text-zinc-900 mb-6">
        Tambah Lamaran
      </h1>

      <ApplicationForm />
    </main>
  );
}
