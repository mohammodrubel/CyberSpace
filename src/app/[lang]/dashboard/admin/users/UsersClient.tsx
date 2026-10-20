"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogForm,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import type { Dict, Locale } from "@/lib/i18n";

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersClient({
  users: initial,
  lang,
  t,
  currentUserId,
}: {
  users: User[];
  lang: string;
  t: Dict;
  currentUserId: number;
}) {
  const [users, setUsers] = useState(initial);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.name ?? "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  async function updateRole(id: number, role: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } finally {
      setUpdating(null);
    }
  }

  async function toggleActive(id: number, isActive: boolean) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (res.ok) setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive } : u)));
    } finally {
      setUpdating(null);
    }
  }

  function promptDelete(id: number) {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (pendingDeleteId == null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${pendingDeleteId}`, { method: "DELETE" });
      if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== pendingDeleteId));
      setConfirmOpen(false);
      setPendingDeleteId(null);
    } finally {
      setDeleting(false);
    }
  }

  async function createAdmin(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      setCreateError(t.dash.errPwRequired);
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setCreateError(data.error || "Failed"); return; }
      setUsers((prev) => [data.data, ...prev]);
      setOpen(false);
      setForm({ name: "", email: "", password: "" });
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <div className="dash-toolbar">
        <Input
          type="text"
          className="dash-search"
          placeholder={t.dash.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <Button type="button" size="sm" onClick={() => { setCreateError(""); setOpen(true); }}>
          + {t.dash.createAdmin}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="dash-empty"><p>{t.dash.noData}</p></div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>{t.dash.name}</th>
                <th>{t.dash.email}</th>
                <th>{t.dash.role}</th>
                <th>{t.dash.active}</th>
                <th>{t.dash.date}</th>
                <th>{t.dash.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.name ?? "—"}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.id === currentUserId ? (
                      <span className="dash-pill dash-pill--blue">{u.role}</span>
                    ) : (
                      <select
                        className="role-select"
                        value={u.role}
                        disabled={updating === u.id}
                        onChange={(e) => updateRole(u.id, e.target.value)}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SALES">SALES</option>
                      </select>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`toggle-btn ${u.isActive ? "toggle-btn--on" : "toggle-btn--off"}`}
                      disabled={updating === u.id || u.id === currentUserId}
                      onClick={() => toggleActive(u.id, !u.isActive)}
                    >
                      {u.isActive ? "●" : "○"}
                    </button>
                  </td>
                  <td>{formatDate(u.createdAt, lang as Locale)}</td>
                  <td>
                    {u.id !== currentUserId && (
                      <Button
                        type="button" variant="destructive" size="sm"
                        disabled={updating === u.id || deleting}
                        onClick={() => promptDelete(u.id)}
                      >
                        ✕
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this user?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{t.dash.createAdmin}</DialogTitle>
            <DialogDescription>New admin account. Password min 6 characters.</DialogDescription>
          </DialogHeader>

          <DialogForm id="create-admin-form" onSubmit={createAdmin} noValidate>
            <DialogBody>
              {createError && <div className="auth-error mb-3">{createError}</div>}

              <div className="space-y-3">
                <div className="field">
                  <Label htmlFor="ua-name">{t.dash.name}</Label>
                  <Input id="ua-name" type="text" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="ua-email">{t.dash.email}</Label>
                  <Input id="ua-email" type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="ua-password">{t.auth.password}</Label>
                  <Input id="ua-password" type="password" value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    required className="mt-1" />
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" form="create-admin-form" disabled={creating}>
                {creating ? t.dash.saving : t.dash.createAdmin}
              </Button>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
