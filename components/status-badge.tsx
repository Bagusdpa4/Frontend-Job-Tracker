import { ApplicationStatus } from "@/lib/types";

const statusStyles: Record<ApplicationStatus, string> = {
  applied: "bg-blue-100 text-blue-700",
  test: "bg-purple-100 text-purple-700",
  "interview HRD": "bg-amber-100 text-amber-700",
  "interview User": "bg-orange-100 text-orange-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
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
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
