"use client";

import { useState } from "react";
import { formatDate } from "@/lib/format";
import type { Dict, Locale } from "@/lib/i18n";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message?: string;
  status: string;
  createdAt: string;
  product?: { translations?: { lang: string; name: string }[] };
}

const STATUSES = ["ALL", "NEW", "IN_PROGRESS", "DONE"];

function getProductName(inq: Inquiry, lang: string) {
  const trans = inq.product?.translations?.find((x) => x.lang === lang.toUpperCase());
  return trans?.name ?? "—";
}

function statusLabel(s: string, t: Dict) {
  if (s === "NEW") return t.dash.statusNew;
  if (s === "IN_PROGRESS") return t.dash.statusInProgress;
  return t.dash.statusDone;
}

export default function InquiriesClient({
  inquiries: initial,
  lang,
  t,
}: {
  inquiries: Inquiry[];
  lang: string;
  t: Dict;
}) {
  const [inquiries, setInquiries] = useState(initial);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  const filtered = inquiries.filter((i) => {
    if (filter !== "ALL" && i.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return i.name.toLowerCase().includes(q) || i.phone.includes(q) || getProductName(i, lang).toLowerCase().includes(q);
    }
    return true;
  });

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="dash-toolbar">
        <input
          type="text" className="dash-search" placeholder={t.dash.search}
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dash-filters">
          {STATUSES.map((s) => (
            <button key={s} type="button"
              className={`dash-filter-btn${filter === s ? " is-active" : ""}`}
              onClick={() => setFilter(s)}>
              {s === "ALL" ? t.dash.filterAll : statusLabel(s, t)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="dash-empty">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <p>{t.dash.noData}</p>
        </div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t.dash.product}</th>
                <th>{t.dash.customer}</th>
                <th>{t.dash.phone}</th>
                <th>{t.dash.date}</th>
                <th>{t.dash.status}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq.id}>
                  <td className="dash-table__id">{inq.id}</td>
                  <td>{getProductName(inq, lang)}</td>
                  <td>
                    <span className="dash-name">{inq.name}</span>
                    {inq.message && <span className="dash-msg" title={inq.message}>💬</span>}
                  </td>
                  <td>{inq.phone}</td>
                  <td>{formatDate(inq.createdAt, lang as Locale)}</td>
                  <td>
                    <select
                      className={`status-select status-select--${inq.status.toLowerCase().replace("_", "-")}`}
                      value={inq.status}
                      disabled={updating === inq.id}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                    >
                      <option value="NEW">{t.dash.statusNew}</option>
                      <option value="IN_PROGRESS">{t.dash.statusInProgress}</option>
                      <option value="DONE">{t.dash.statusDone}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
