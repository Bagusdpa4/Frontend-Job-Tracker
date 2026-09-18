"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplications } from "@/features/applications/applicationsSlice";
import ApplicationCard from "@/components/applications/application-card";

const STATUS_OPTIONS = [
  { value: "", label: "Semua Status" },
  { value: "applied", label: "Applied" },
  { value: "test", label: "Tes/Psikotes" },
  { value: "interview HRD", label: "Interview HRD" },
  { value: "interview User", label: "Interview User" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const SOURCE_OPTIONS = [
  "LinkedIn",
  "Email",
  "Web Perusahaan",
  "JobStreet",
  "Glints",
  "Kalibrr",
  "Deals",
  "Indeed",
];

const filterInputClass =
  "rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

export default function ApplicationsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.applications
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [isCustomSource, setIsCustomSource] = useState(false);
  const [page, setPage] = useState(1);

  const pagination = useAppSelector((state) => state.applications.pagination);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    setPage(1);
  }

  function handleSourceChange(value: string) {
    setSource(value);
    setPage(1);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchApplications({ search, status, source, page }));
    }, 400);
    return () => clearTimeout(timeout);
  }, [dispatch, search, status, source, page]);

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

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari perusahaan atau posisi..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`${filterInputClass} flex-1 min-w-40`}
        />
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={filterInputClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <select
            value={isCustomSource ? "Lainnya" : source}
            onChange={(e) => {
              if (e.target.value === "Lainnya") {
                setIsCustomSource(true);
                handleSourceChange("");
              } else {
                setIsCustomSource(false);
                handleSourceChange(e.target.value);
              }
            }}
            className={filterInputClass}
          >
            <option value="">Semua Sumber</option>
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
            <option value="Lainnya">Lainnya</option>
          </select>

          {isCustomSource && (
            <input
              type="text"
              placeholder="Ketik sumber lamaran..."
              value={source}
              onChange={(e) => handleSourceChange(e.target.value)}
              className={filterInputClass}
            />
          )}
        </div>
      </div>

      {loading && <p className="text-zinc-500">Memuat data...</p>}
      {error && <p className="text-rose-600">{error}</p>}

      {!loading && items.length === 0 ? (
        <p className="text-zinc-500">Belum ada lamaran. Yuk tambah dulu!</p>
      ) : (
        <ul className="space-y-3">
          {items.map((app) => (
            <li key={app.id}>
              <ApplicationCard app={app} />
            </li>
          ))}
        </ul>
      )}

      {pagination && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-zinc-500">
            Halaman {pagination.page} dari {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </main>
  );
}
