"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplicationById } from "@/features/applications/applicationsSlice";
import StatusBadge from "@/components/status-badge";
import DeleteButton from "@/components/applications/delete-button";

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { selected: app, loading } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplicationById(id));
  }, [dispatch, id]);

  if (loading || !app) {
    return (
      <main className="max-w-2xl mx-auto w-full px-6 py-10">
        <p className="text-zinc-500">Memuat data...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <Link
        href="/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiArrowLeft size={20} />
        Kembali ke list
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl lg:text-2xl font-semibold text-zinc-900">
              {app.position}
            </h1>
            <StatusBadge status={app.status} />
          </div>
          <p className="text-zinc-500">{app.company}</p>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <p className="text-zinc-600">
            <span className="font-medium text-zinc-800">Tanggal Lamar:</span>{" "}
            {app.appliedDate}
          </p>
          {app.source && (
            <p className="text-zinc-600">
              <span className="font-medium text-zinc-800">Sumber Lamar:</span>{" "}
              {app.source}
            </p>
          )}
          {app.notes && (
            <p className="text-zinc-600">
              <span className="font-medium text-zinc-800">Catatan:</span>{" "}
              {app.notes}
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-zinc-100 pt-4 flex gap-3">
          <Link
            href={`/applications/${app.id}/edit`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Edit
          </Link>
          <DeleteButton id={app.id} />
        </div>
      </div>
    </main>
  );
}
