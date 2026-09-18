import Link from "next/link";
import { JobApplication } from "@/lib/types";
import StatusBadge from "@/components/status-badge";

export default function ApplicationCard({ app }: { app: JobApplication }) {
  return (
    <Link
      href={`/applications/${app.id}`}
      className="block rounded-xl border border-zinc-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg text-zinc-900">{app.position}</p>
          <p className="text-md text-zinc-700">{app.company}</p>
          {app.source && (
            <p className="text-sm text-zinc-500 mt-0.5">{app.source}</p>
          )}
        </div>
        <StatusBadge status={app.status} />
      </div>
    </Link>
  );
}
