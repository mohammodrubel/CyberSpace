"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import type { JwtUser } from "@/lib/server-auth";
import Logo from "@/components/Logo";

interface Props {
  lang: string;
  t: Dict;
  user: JwtUser;
}

export default function AdminSidebar({ lang, t, user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const base = `/${lang}/dashboard/admin`;

  const links = [
    { href: base, label: t.dash.overview, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>, exact: true },
    { href: `${base}/products`, label: t.dash.products, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
    { href: `${base}/categories`, label: t.dash.categories ?? "Categories", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
    { href: `${base}/inquiries`, label: t.dash.inquiries, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { href: `${base}/users`, label: t.dash.users, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { href: `${base}/banners`, label: t.dash.banners ?? "Banners", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg> },
    { href: `${base}/partners`, label: t.dash.partners ?? "Partners", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857"/><path d="M9 20H4v-2a3 3 0 0 1 5.356-1.857"/><circle cx="12" cy="7" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg> },
    { href: `${base}/news`, label: t.dash.news ?? "News", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg> },
    { href: `${base}/home-content`, label: t.dash.homeContent ?? "Home Content", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { href: `${base}/settings`, label: t.dash.settings, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
    { href: `${base}/change-password`, label: t.dash.changePassword, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  ];

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href) && (exact || href !== base || pathname === base);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${lang}/login`);
    router.refresh();
  }

  const nav = (
    <nav className="sidebar__nav" aria-label="Admin navigation">
      {links.map(({ href, label, icon, exact }) => (
        <Link key={href} href={href}
          className={`sidebar__link${isActive(href, exact) ? " is-active" : ""}`}
          onClick={() => setMobileOpen(false)}>
          <span className="sidebar__icon" aria-hidden="true">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="dash-topbar">
        <button className="sidebar__hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <Link href={`/${lang}`} className="dash-topbar__logo"><Logo /></Link>
        <div className="dash-topbar__user">
          <span className="sidebar__role-badge sidebar__role-badge--admin">ADMIN</span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="sidebar" aria-label="Admin panel">
        <div className="sidebar__header">
          <Link href={`/${lang}`} className="sidebar__logo"><Logo /></Link>
        </div>
        <div className="sidebar__user">
          <div className="sidebar__avatar">{(user.name ?? user.email)[0].toUpperCase()}</div>
          <div className="sidebar__userinfo">
            <p className="sidebar__username">{user.name ?? user.email}</p>
            <span className="sidebar__role-badge sidebar__role-badge--admin">ADMIN</span>
          </div>
        </div>
        {nav}
        <div className="sidebar__footer">
          <Link href={`/${lang}`} className="sidebar__link sidebar__link--secondary">
            <span className="sidebar__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span>{t.dash.publicSite}</span>
          </Link>
          <button className="sidebar__link sidebar__link--danger" onClick={handleLogout}>
            <span className="sidebar__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            <span>{t.dash.logout}</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
      <aside className={`sidebar sidebar--mobile${mobileOpen ? " is-open" : ""}`} aria-label="Admin navigation mobile">
        <div className="sidebar__header">
          <Link href={`/${lang}`} className="sidebar__logo" onClick={() => setMobileOpen(false)}><Logo /></Link>
          <button className="sidebar__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="sidebar__user">
          <div className="sidebar__avatar">{(user.name ?? user.email)[0].toUpperCase()}</div>
          <div className="sidebar__userinfo">
            <p className="sidebar__username">{user.name ?? user.email}</p>
            <span className="sidebar__role-badge sidebar__role-badge--admin">ADMIN</span>
          </div>
        </div>
        {nav}
        <div className="sidebar__footer">
          <button className="sidebar__link sidebar__link--danger" onClick={handleLogout}>
            <span className="sidebar__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            <span>{t.dash.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
