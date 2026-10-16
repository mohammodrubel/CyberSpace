"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { syncProducts } from "./thunks";
import { hydrateInquiries, type Inquiry } from "./inquirySlice";
import { hydrateSettings } from "./settingsSlice";

const INQ_KEY = "cs.inquiries";
const SET_KEY = "cs.settings";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<AppStore | null>(null);
  if (!ref.current) ref.current = makeStore();
  const store = ref.current;

  useEffect(() => {
    // Demo persistence only. Real inquiries and settings live on the server.
    try {
      const inq = localStorage.getItem(INQ_KEY);
      if (inq) store.dispatch(hydrateInquiries(JSON.parse(inq) as Inquiry[]));
      const set = localStorage.getItem(SET_KEY);
      if (set) {
        const { showPrices, showStock } = JSON.parse(set);
        store.dispatch(hydrateSettings({ showPrices: !!showPrices, showStock: !!showStock }));
      }
    } catch {}
    store.dispatch(syncProducts());

    const unsub = store.subscribe(() => {
      try {
        const s = store.getState();
        localStorage.setItem(INQ_KEY, JSON.stringify(s.inquiry.items));
        localStorage.setItem(SET_KEY, JSON.stringify({ showPrices: s.settings.showPrices, showStock: s.settings.showStock }));
      } catch {}
    });

    // Interval sync, standing in for the 1C polling interval that will be agreed.
    const timer = setInterval(() => store.dispatch(syncProducts()), 15 * 60 * 1000);
    return () => { unsub(); clearInterval(timer); };
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
