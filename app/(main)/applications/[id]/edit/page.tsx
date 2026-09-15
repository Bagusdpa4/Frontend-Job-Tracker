import Link from "next/link";
import { notFound } from "next/navigation";
import { mockApplications } from "@/lib/mock-data";
import ApplicationForm from "@/components/applications/application-form";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditApplicationPage({ params }: PageProps) {
  const { id } = await params;
  const app = mockApplications.find((a) => a.id === id);

  if (!app) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <Link
        href={`/applications/${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"
      >
        ← Kembali
      </Link>

      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
        Edit Lamaran
      </h1>

      <ApplicationForm initialData={app} />
    </main>
  );
}
