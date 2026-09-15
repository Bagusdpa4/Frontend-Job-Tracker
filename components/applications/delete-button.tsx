"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/confirm-dialog";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleConfirmDelete() {
    setLoading(true);

    // TODO: sambungkan ke API DELETE saat backend sudah siap
    console.log("Hapus lamaran id:", id);

    setTimeout(() => {
      router.push("/applications");
    }, 300);
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="rounded-full border border-rose-200 text-rose-600 px-4 py-2 text-sm font-medium hover:bg-rose-50 transition-colors"
      >
        Hapus Lamaran
      </button>

      <ConfirmDialog
        open={showConfirm}
        title="Hapus Lamaran?"
        description="Data lamaran ini akan dihapus permanen dan tidak bisa dikembalikan."
        confirmLabel="Ya, Hapus"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        loading={loading}
      />
    </>
  );
}
