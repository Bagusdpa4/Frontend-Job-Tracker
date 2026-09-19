"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplicationById } from "@/features/applications/applicationsSlice";
import StatusBadge from "@/components/status-badge";
import DeleteButton from "@/components/applications/delete-button";
import { TbWorldSearch } from "react-icons/tb";
import { FaMapLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import {
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
  FaBook,
  FaEdit,
} from "react-icons/fa";

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
      <main className="max-w-6xl mx-auto w-full px-6 py-10">
        <p className="text-zinc-500">Memuat data...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
      <Link
        href="/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiArrowLeft size={20} />
        Kembali ke list
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <h1 className="text-xl lg:text-2xl font-semibold text-zinc-900 flex items-center gap-1.5 mb-1 min-w-0">
              <FaBriefcase className="shrink-0" />
              <span className="wrap-break-words">{app.position}</span>
            </h1>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5 text-xs text-zinc-500 shrink-0">
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-zinc-900 shrink-0" />
                <span className="whitespace-nowrap">{app.appliedDate}</span>
              </div>
              <StatusBadge status={app.status} />
            </div>
          </div>
          <p className="text-zinc-500 flex items-center gap-1.5 mb-1 min-w-0">
            <FaBuilding className="shrink-0" />
            <span className="wrap-break-words">{app.company}</span>
          </p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="text-zinc-600 font-medium flex items-start gap-1.5 mb-1">
            <TbWorldSearch className="shrink-0 mt-0.5" />
            <span className="wrap-break-words">{app.source || "-"}</span>
          </p>
          <p className="text-zinc-600 font-medium flex items-start gap-1.5 mb-1">
            <FaMapLocationDot className="shrink-0 mt-0.5" />
            <span className="wrap-break-words">{app.city || "-"}</span>
          </p>
          <p className="text-zinc-600 font-medium flex items-start gap-1.5 mb-1">
            <FaMoneyBill1Wave className="shrink-0 mt-0.5" />
            <span className="wrap-break-words">{app.salaryRange || "-"}</span>
          </p>
          <p className="text-zinc-600 font-medium flex items-start gap-1.5 mb-1">
            <FaBook className="shrink-0 mt-0.5" />
            <span className="wrap-break-words">{app.notes || "-"}</span>
          </p>
        </div>

        <div className="mt-6 border-t border-zinc-100 pt-4 flex flex-wrap gap-3">
          <Link
            href={`/applications/${app.id}/edit`}
            className="rounded-full items-center hover:border-indigo-300 hover:shadow-sm gap-1.5 flex border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <FaEdit />
            Edit
          </Link>
          <DeleteButton id={app.id} />
        </div>
      </div>
    </main>
  );
}
