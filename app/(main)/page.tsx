"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplications } from "@/features/applications/applicationsSlice";
import ApplicationCard from "@/components/applications/application-card";
import StatusPieChart from "@/components/dashboard/status-pie-chart";
import { parseIndonesianDate } from "@/lib/date";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: applications, loading } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const recentApplications = [...applications]
    .sort((a, b) =>
      parseIndonesianDate(b.appliedDate).localeCompare(
        parseIndonesianDate(a.appliedDate)
      )
    )
    .slice(0, 3);

  const counts = {
    applied: applications.filter((a) => a.status === "applied").length,
    test: applications.filter((a) => a.status === "test").length,
    interviewHrd: applications.filter((a) => a.status === "interview HRD")
      .length,
    interviewUser: applications.filter((a) => a.status === "interview User")
      .length,
    offer: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-1">
        Job Application Tracker
      </h1>
      <p className="text-zinc-500 mb-8">
        {loading
          ? "Memuat data..."
          : `Total ${applications.length} lamaran tercatat.`}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <StatCard label="Applied" value={counts.applied} color="blue" />
        <StatCard label="Tes" value={counts.test} color="purple" />
        <StatCard
          label="Interview HRD"
          value={counts.interviewHrd}
          color="amber"
        />
        <StatCard
          label="Interview User"
          value={counts.interviewUser}
          color="orange"
        />
        <StatCard label="Offer" value={counts.offer} color="emerald" />
        <StatCard label="Rejected" value={counts.rejected} color="rose" />
      </div>

      <div className="flex gap-3 mb-10 text-center">
        <Link
          href="/applications"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          Lihat Semua Lamaran
        </Link>
        <Link
          href="/applications/new"
          className="rounded-full bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Tambah Lamaran
        </Link>
      </div>

      {!loading && applications.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
              Progress Lamaran
            </h2>
            <StatusPieChart counts={counts} total={applications.length} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
              Lamaran Terbaru
            </h2>
            <ul className="space-y-3">
              {recentApplications.map((app) => (
                <li key={app.id}>
                  <ApplicationCard app={app} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

const colorMap = {
  blue: "bg-blue-200 text-blue-700 border-blue-400",
  purple: "bg-purple-200 text-purple-700 border-purple-400",
  amber: "bg-amber-200 text-amber-700 border-amber-400",
  orange: "bg-orange-200 text-orange-700 border-orange-400",
  emerald: "bg-emerald-200 text-emerald-700 border-emerald-400",
  rose: "bg-rose-200 text-rose-700 border-rose-400",
};

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: keyof typeof colorMap;
}) {
  return (
    <div className={`rounded-xl border p-4 text-center ${colorMap[color]}`}>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}
