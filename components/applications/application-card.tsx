import Link from "next/link";
import { JobApplication } from "@/lib/types";
import StatusBadge from "@/components/status-badge";
import { TbWorldSearch } from "react-icons/tb";
import { FaBuilding, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

export default function ApplicationCard({ app }: { app: JobApplication }) {
  return (
    <Link
      href={`/applications/${app.id}`}
      className="block rounded-xl border border-zinc-300 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-lg text-zinc-900 flex items-center gap-1.5 mb-1">
            <FaBriefcase className="text-zinc-900 text-sm shrink-0" />
            <span className="truncate">{app.position}</span>
          </p>
          <p className="text-md text-zinc-700 flex items-center gap-1.5 mb-1">
            <FaBuilding className="text-zinc-900 text-sm shrink-0" />
            <span className="truncate">{app.company}</span>
          </p>
          {app.source && (
            <p className="text-sm text-zinc-500 mt-0.5 flex items-center gap-1.5 mb-1">
              <TbWorldSearch className="text-zinc-900 text-sm shrink-0" />
              <span className="truncate">{app.source}</span>
            </p>
          )}
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1.5 shrink-0">
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            <FaCalendarAlt className="text-zinc-900 shrink-0" />
            <span className="whitespace-nowrap">{app.appliedDate}</span>
          </p>
          <StatusBadge status={app.status} />
        </div>
      </div>
    </Link>
  );
}
