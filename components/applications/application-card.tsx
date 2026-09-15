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
          <p className="font-medium text-zinc-900">{app.position}</p>
          <p className="text-sm text-zinc-500">{app.company}</p>
        </div>
        <StatusBadge status={app.status} />
      </div>
    </Link>
  );
}
