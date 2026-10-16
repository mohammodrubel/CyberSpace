"use client";

import { formatDate } from "@/lib/format";
import { useLang } from "@/lib/useLang";
import { useAppDispatch, useAppSelector } from "@/store";
import { setInquiryStatus, type InquiryStatus } from "@/store/inquirySlice";
import { setShowPrices, setShowStock } from "@/store/settingsSlice";
import { syncProducts } from "@/store/thunks";

export default function AdminClient() {
  const { lang, t } = useLang();
  const dispatch = useAppDispatch();
  const { showPrices, showStock, lastSyncAt } = useAppSelector((s) => s.settings);
  const inquiries = useAppSelector((s) => s.inquiry.items);
  const statusLabel: Record<InquiryStatus, string> = { new: t.admin.statusNew, inProgress: t.admin.statusInProgress, done: t.admin.statusDone };

  // Visibility changes trigger a re-sync so hidden values are dropped from the data the public site holds.
  const toggle = (kind: "price" | "stock", v: boolean) => {
    dispatch(kind === "price" ? setShowPrices(v) : setShowStock(v));
    dispatch(syncProducts());
  };

  return (
    <div className="container section admin">
      <h1>{t.admin.title}</h1>
      <p className="notice">{t.admin.note}</p>

      <div className="admin__grid">
        <section className="panel">
          <h2>{t.admin.visibility}</h2>
          <label className="switch"><input type="checkbox" checked={showPrices} onChange={(e) => toggle("price", e.target.checked)} /><span>{t.admin.showPrices}</span></label>
          <label className="switch"><input type="checkbox" checked={showStock} onChange={(e) => toggle("stock", e.target.checked)} /><span>{t.admin.showStock}</span></label>
          <p className="muted small">{t.admin.hiddenNote}</p>
        </section>

        <section className="panel">
          <h2>{t.admin.sync}</h2>
          <p className="muted small">{t.admin.interval}</p>
          <p>{t.admin.lastSync}: <strong>{lastSyncAt ? formatDate(lastSyncAt, lang) : "—"}</strong></p>
          <button type="button" className="btn btn--primary" onClick={() => dispatch(syncProducts())}>{t.admin.syncNow}</button>
        </section>
      </div>

      <section className="panel">
        <h2>{t.admin.inquiries} ({inquiries.length})</h2>
        {inquiries.length === 0 ? <p className="muted">{t.admin.empty}</p> : (
          <div className="tablewrap">
            <table className="table">
              <thead>
                <tr><th>{t.admin.colDate}</th><th>{t.admin.colProduct}</th><th>{t.admin.colCustomer}</th><th>{t.admin.colPhone}</th><th>{t.admin.colStatus}</th></tr>
              </thead>
              <tbody>
                {inquiries.map((i) => (
                  <tr key={i.id}>
                    <td>{formatDate(i.createdAt, lang)}</td>
                    <td>{i.productName}<br /><span className="muted small">{i.sku}</span></td>
                    <td>{i.name}{i.message && <><br /><span className="muted small">{i.message}</span></>}</td>
                    <td>{i.phone}</td>
                    <td>
                      <label className="sr" htmlFor={`st-${i.id}`}>{t.admin.colStatus}</label>
                      <select id={`st-${i.id}`} className={`status status--${i.status}`} value={i.status}
                        onChange={(e) => dispatch(setInquiryStatus({ id: i.id, status: e.target.value as InquiryStatus }))}>
                        {(Object.keys(statusLabel) as InquiryStatus[]).map((k) => <option key={k} value={k}>{statusLabel[k]}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
