"use client";

import { formatDate } from "@/lib/format";
import { useLang } from "@/lib/useLang";
import { useAppDispatch, useAppSelector } from "@/store";
import { setInquiryStatus, type InquiryStatus } from "@/store/inquirySlice";
import { setShowPrices, setShowStock } from "@/store/settingsSlice";
import { syncProducts } from "@/store/thunks";
import { FadeDown, FadeUp } from "./Motion";

export default function AdminClient() {
  const { lang, t } = useLang();
  const dispatch = useAppDispatch();
  const { showPrices, showStock, lastSyncAt } = useAppSelector((s) => s.settings);
  const inquiries = useAppSelector((s) => s.inquiry.items);
  const statusLabel: Record<InquiryStatus, string> = { new: t.admin.statusNew, inProgress: t.admin.statusInProgress, done: t.admin.statusDone };

  const toggle = (kind: "price" | "stock", v: boolean) => {
    dispatch(kind === "price" ? setShowPrices(v) : setShowStock(v));
    dispatch(syncProducts());
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const doneCount = inquiries.filter((i) => i.status === "done").length;

  return (
    <div className="container section admin">
      <FadeDown><h1>{t.admin.title}</h1></FadeDown>
      <FadeUp delay={0.04}><p className="notice">{t.admin.note}</p></FadeUp>

      {inquiries.length > 0 && (
        <FadeUp delay={0.08} style={{ marginBottom: "18px" }}>
          <div className="admin__grid">
            <div className="panel" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: 0 }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--red)", lineHeight: 1 }}>{newCount}</div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--navy)" }}>{t.admin.statusNew}</div>
                <div className="muted small">{t.admin.inquiries}</div>
              </div>
            </div>
            <div className="panel" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: 0 }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--green)", lineHeight: 1 }}>{doneCount}</div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--navy)" }}>{t.admin.statusDone}</div>
                <div className="muted small">{t.admin.inquiries}</div>
              </div>
            </div>
          </div>
        </FadeUp>
      )}

      <FadeUp delay={0.12}>
        <div className="admin__grid">
          <section className="panel">
            <h2>{t.admin.visibility}</h2>
            <label className="switch">
              <input type="checkbox" checked={showPrices} onChange={(e) => toggle("price", e.target.checked)} />
              <span>{t.admin.showPrices}</span>
            </label>
            <label className="switch">
              <input type="checkbox" checked={showStock} onChange={(e) => toggle("stock", e.target.checked)} />
              <span>{t.admin.showStock}</span>
            </label>
            <p className="muted small" style={{ marginTop: "12px" }}>{t.admin.hiddenNote}</p>
          </section>

          <section className="panel">
            <h2>{t.admin.sync}</h2>
            <p className="muted small">{t.admin.interval}</p>
            <p style={{ margin: "12px 0" }}>{t.admin.lastSync}: <strong>{lastSyncAt ? formatDate(lastSyncAt, lang) : "—"}</strong></p>
            <button type="button" className="btn btn--primary" onClick={() => dispatch(syncProducts())}>{t.admin.syncNow}</button>
          </section>
        </div>
      </FadeUp>

      <FadeUp delay={0.16}>
        <section className="panel">
          <h2>{t.admin.inquiries} ({inquiries.length})</h2>
          {inquiries.length === 0 ? (
            <p className="muted">{t.admin.empty}</p>
          ) : (
            <div className="tablewrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t.admin.colDate}</th>
                    <th>{t.admin.colProduct}</th>
                    <th>{t.admin.colCustomer}</th>
                    <th>{t.admin.colPhone}</th>
                    <th>{t.admin.colStatus}</th>
                  </tr>
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
                        <select
                          id={`st-${i.id}`}
                          className={`status status--${i.status}`}
                          value={i.status}
                          onChange={(e) => dispatch(setInquiryStatus({ id: i.id, status: e.target.value as InquiryStatus }))}
                        >
                          {(Object.keys(statusLabel) as InquiryStatus[]).map((k) => (
                            <option key={k} value={k}>{statusLabel[k]}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </FadeUp>
    </div>
  );
}
