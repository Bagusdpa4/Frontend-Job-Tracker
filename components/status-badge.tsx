import { ApplicationStatus } from "@/lib/types";

const statusStyles: Record<ApplicationStatus, string> = {
  applied: "bg-blue-200 text-blue-700 border-blue-400",
  test: "bg-purple-200 text-purple-700 border-purple-400",
  "interview HRD": "bg-amber-200 text-amber-700 border-amber-400",
  "interview User": "bg-orange-200 text-orange-700 border-orange-400",
  offer: "bg-emerald-200 text-emerald-700 border-emerald-400",
  rejected: "bg-rose-200 text-rose-700 border-rose-400",
};

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  test: "Tes/Psikotes",
  "interview HRD": "Interview HRD",
  "interview User": "Interview User",
  offer: "Offer",
  rejected: "Rejected",
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center text-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
