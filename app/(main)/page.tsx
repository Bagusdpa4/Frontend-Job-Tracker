"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplications } from "@/features/applications/applicationsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: applications, loading } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

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

      <div className="flex gap-3">
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
          + Tambah Lamaran
        </Link>
      </div>
    </main>
  );
}

const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
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
