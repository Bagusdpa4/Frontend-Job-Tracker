"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { store } from "@/lib/store";
import { restoreSession, setInitialized } from "@/features/auth/authSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = Cookies.get("token");
    const userStr = Cookies.get("user");

    if (token && userStr) {
      store.dispatch(restoreSession({ token, user: JSON.parse(userStr) }));
    } else {
      store.dispatch(setInitialized());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
