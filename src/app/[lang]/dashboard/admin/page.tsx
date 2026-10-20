import { getAuthToken, getServerSession, BACKEND_URL } from "@/lib/server-auth";
import { getDict, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
  product?: { translations?: { lang: string; name: string }[] };
}

async function fetchStats(token: string) {
  try {
    const [inqRes, prodRes, userRes] = await Promise.all([
      fetch(`${BACKEND_URL}/inquiries`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
      fetch(`${BACKEND_URL}/products`, { cache: "no-store" }),
      fetch(`${BACKEND_URL}/user`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
    ]);
    const inquiries: Inquiry[] = inqRes.ok ? (await inqRes.json()).data ?? [] : [];
    const products = prodRes.ok ? (await prodRes.json()).data ?? [] : [];
    const users = userRes.ok ? (await userRes.json()).data ?? [] : [];
    return { inquiries, products, users };
  } catch {
    return { inquiries: [], products: [], users: [] };
  }
}

function getStatusLabel(status: string, t: ReturnType<typeof getDict>) {
  if (status === "NEW") return t.dash.statusNew;
  if (status === "IN_PROGRESS") return t.dash.statusInProgress;
  return t.dash.statusDone;
}

function getProductName(inq: Inquiry, lang: string) {
  const trans = inq.product?.translations?.find((x) => x.lang === lang.toUpperCase());
  return trans?.name ?? "—";
}

export default async function AdminDashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const session = await getServerSession();
  const token = await getAuthToken();
  const { inquiries, products, users } = token ? await fetchStats(token) : { inquiries: [], products: [], users: [] };

  const newCount = inquiries.filter((i) => i.status === "NEW").length;
  const inProgressCount = inquiries.filter((i) => i.status === "IN_PROGRESS").length;
  const doneCount = inquiries.filter((i) => i.status === "DONE").length;
  const recent = inquiries.slice(0, 5);

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">{t.dash.welcomeBack}{session?.name ? `, ${session.name}` : ""}</h1>
        <p className="dash-page-sub">{t.dash.adminPanel}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card stat-card--blue">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{t.dash.newInquiries}</p>
            <p className="stat-card__value">{newCount}</p>
          </div>
        </div>
        <div className="stat-card stat-card--amber">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{t.dash.inProgress}</p>
            <p className="stat-card__value">{inProgressCount}</p>
          </div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{t.dash.completed}</p>
            <p className="stat-card__value">{doneCount}</p>
          </div>
        </div>
        <div className="stat-card stat-card--violet">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/></svg>
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{t.dash.totalProducts}</p>
            <p className="stat-card__value">{products.length}</p>
          </div>
        </div>
        <div className="stat-card stat-card--cyan">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{t.dash.totalUsers}</p>
            <p className="stat-card__value">{users.length}</p>
          </div>
        </div>
      </div>

      <div className="dash-section">
        <h2 className="dash-section__title">{t.dash.recentInquiries}</h2>
        {recent.length === 0 ? (
          <div className="dash-empty">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <p>{t.dash.noData}</p>
          </div>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>{t.dash.product}</th>
                  <th>{t.dash.customer}</th>
                  <th>{t.dash.phone}</th>
                  <th>{t.dash.date}</th>
                  <th>{t.dash.status}</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((inq) => (
                  <tr key={inq.id}>
                    <td>{getProductName(inq, lang)}</td>
                    <td>{inq.name}</td>
                    <td>{inq.phone}</td>
                    <td>{formatDate(inq.createdAt, lang)}</td>
                    <td>
                      <span className={`status-badge status-badge--${inq.status.toLowerCase().replace("_", "-")}`}>
                        {getStatusLabel(inq.status, t)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
