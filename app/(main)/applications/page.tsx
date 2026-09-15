import Link from "next/link";
import { mockApplications } from "@/lib/mock-data";
import ApplicationCard from "@/components/applications/application-card";

export default function ApplicationsPage() {
  const applications = mockApplications;

  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Lamaran Kerja</h1>
        <Link
          href="/applications/new"
          className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + Tambah Lamaran
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-zinc-500">Belum ada lamaran. Yuk tambah dulu!</p>
      ) : (
        <ul className="space-y-3">
          {applications.map((app) => (
            <li key={app.id}>
              <ApplicationCard app={app} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}