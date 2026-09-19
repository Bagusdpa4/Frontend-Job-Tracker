"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApplicationById } from "@/features/applications/applicationsSlice";
import ApplicationForm from "@/components/applications/application-form";
import { FiArrowLeft } from "react-icons/fi";

export default function EditApplicationPage() {
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
    <main className="max-w-6xl mx-auto w-full px-6 py-10">
      <Link
        href={`/applications/${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <FiArrowLeft size={20} />
        Kembali ke list
      </Link>

      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
        Edit Lamaran
      </h1>

      <ApplicationForm initialData={app} />
    </main>
  );
}
