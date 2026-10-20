import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message?: string;
  status: string;
  createdAt: string;
  product?: { translations?: { lang: string; name: string }[] };
}

async function fetchMyInquiries(token: string): Promise<Inquiry[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/inquiries/my`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch {
    return [];
  }
}

export default async function SalesInquiriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const token = await getAuthToken();
  const inquiries = token ? await fetchMyInquiries(token) : [];

  function getProductName(inq: Inquiry) {
    const trans = inq.product?.translations?.find(
      (x) => x.lang === lang.toUpperCase()
    );
    return trans?.name ?? "—";
  }

  function statusLabel(s: string) {
    if (s === "NEW") return t.dash.statusNew;
    if (s === "IN_PROGRESS") return t.dash.statusInProgress;
    return t.dash.statusDone;
  }

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">{t.dash.myInquiries}</h1>
        <Link
          href={`/${lang}/dashboard/sales/products`}
          className="btn btn--primary btn--sm"
        >
          + {t.dash.submitInquiry}
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <div className="dash-empty">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <p>{t.dash.noInquiries}</p>
          <Link
            href={`/${lang}/dashboard/sales/products`}
            className="btn btn--primary btn--sm"
          >
            {t.dash.browseProducts}
          </Link>
        </div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t.dash.product}</th>
                <th>{t.dash.date}</th>
                <th>{t.dash.status}</th>
                <th>{t.inquiry.message}</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td className="dash-table__id">{inq.id}</td>
                  <td>{getProductName(inq)}</td>
                  <td>{formatDate(inq.createdAt, lang as Locale)}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${inq.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {statusLabel(inq.status)}
                    </span>
                  </td>
                  <td className="dash-msg-cell">{inq.message ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
