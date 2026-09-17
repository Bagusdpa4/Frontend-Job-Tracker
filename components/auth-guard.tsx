"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized && !token) {
      router.replace("/login");
    }
  }, [isInitialized, token, router]);

  if (!isInitialized) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-zinc-400 text-sm">Memuat...</p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
