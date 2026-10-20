"use client";

import { useState } from "react";
import {
  useGetPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  type Partner,
  type CreatePartnerInput,
} from "@/redux/fetchers/partner/partnerApi";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogForm,
} from "@/components/ui/dialog";
import type { Dict } from "@/lib/i18n";

type LangKey = "EN" | "AZ" | "RU";
const LANGS: LangKey[] = ["EN", "AZ", "RU"];

const emptyForm = (): CreatePartnerInput => ({
  name: "", logoUrl: "", websiteUrl: "",
  descEN: "", descAZ: "", descRU: "",
  isActive: true, order: 0,
});

function partnerToForm(p: Partner): CreatePartnerInput {
  return {
    name: p.name, logoUrl: p.logoUrl ?? "", websiteUrl: p.websiteUrl ?? "",
    descEN: p.descEN ?? "", descAZ: p.descAZ ?? "", descRU: p.descRU ?? "",
    isActive: p.isActive, order: p.order,
  };
}

function cleanPayload(form: CreatePartnerInput): CreatePartnerInput {
  return {
    name: form.name.trim(),
    logoUrl: form.logoUrl?.trim() || null,
    websiteUrl: form.websiteUrl?.trim() || null,
    descEN: form.descEN?.trim() || null,
    descAZ: form.descAZ?.trim() || null,
    descRU: form.descRU?.trim() || null,
    isActive: form.isActive,
    order: form.order,
  };
}

const descKey = (l: LangKey) => `desc${l}` as keyof CreatePartnerInput;

export default function PartnersClient({ t }: { t: Dict }) {
  const { data: partners = [], isLoading } = useGetPartnersQuery();
  const [create, { isLoading: creating }] = useCreatePartnerMutation();
  const [update, { isLoading: updating }] = useUpdatePartnerMutation();
  const [deletePartner, { isLoading: deleting }] = useDeletePartnerMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<CreatePartnerInput>(emptyForm());
  const [activeLang, setActiveLang] = useState<LangKey>("EN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  function openCreate() {
    setEditing(null); setForm(emptyForm()); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function openEdit(p: Partner) {
    setEditing(p); setForm(partnerToForm(p)); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function handleOpenChange(v: boolean) {
    if (!v) { setOpen(false); setEditing(null); }
  }

  function set<K extends keyof CreatePartnerInput>(key: K, value: CreatePartnerInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Name is required."); return; }
    try {
      const payload = cleanPayload(form);
      if (editing) {
        await update({ id: editing.id, body: payload }).unwrap();
        setSuccess("Updated!");
      } else {
        await create(payload).unwrap();
        setSuccess("Created!");
      }
      setTimeout(() => { setSuccess(""); setOpen(false); setEditing(null); }, 1200);
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message;
      setError(msg ?? "Save failed. Please try again.");
    }
  }

  function promptDelete(id: number) {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (pendingDeleteId == null) return;
    try {
      await deletePartner(pendingDeleteId).unwrap();
      setConfirmOpen(false);
      setPendingDeleteId(null);
    } catch {
      setConfirmOpen(false);
    }
  }

  const busy = creating || updating;

  return (
    <div>
      <div className="dash-toolbar">
        <h1 className="dash-page-title">{t.dash.partners ?? "Partners"}</h1>
        <Button type="button" onClick={openCreate}>+ {t.dash.add ?? "Add"}</Button>
      </div>

      {isLoading ? (
        <p className="muted">{t.common.loading}</p>
      ) : partners.length === 0 ? (
        <div className="dash-empty"><p>{t.dash.noData}</p></div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>{t.dash.name}</th>
                <th>Website</th>
                <th>{t.dash.formOrder ?? "Order"}</th>
                <th>{t.dash.formActive ?? "Active"}</th>
                <th>{t.dash.actions}</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.logoUrl
                      ? <img src={p.logoUrl} alt={p.name} className="dash-thumb" />
                      : <div className="dash-thumb-placeholder"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    }
                  </td>
                  <td>{p.name}</td>
                  <td>
                    {p.websiteUrl
                      ? <a href={p.websiteUrl} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>{new URL(p.websiteUrl).hostname}</a>
                      : "—"}
                  </td>
                  <td>{p.order}</td>
                  <td>
                    <span className={`status-badge ${p.isActive ? "status-badge--ok" : "status-badge--off"}`}>
                      {p.isActive ? "Active" : "Off"}
                    </span>
                  </td>
                  <td className="dash-actions">
                    <Button type="button" variant="outline" size="sm" onClick={() => openEdit(p)}>{t.dash.edit ?? "Edit"}</Button>
                    <Button type="button" variant="destructive" size="sm" disabled={deleting} onClick={() => promptDelete(p.id)}>{t.dash.delete ?? "Delete"}</Button>
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
        title="Delete this partner?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      {/* Create / Edit dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent size="wide" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editing ? (t.dash.edit ?? "Edit") : (t.dash.add ?? "Add")} Partner</DialogTitle>
            <DialogDescription>Partner details and multilingual description.</DialogDescription>
          </DialogHeader>

          <DialogForm id="partner-form" onSubmit={handleSubmit} noValidate>
            <DialogBody>
              {error && <p className="pf-alert pf-alert--error" role="alert">{error}</p>}
              {success && <p className="notice notice--ok mb-3">{success}</p>}

              <div className="field mb-3">
                <Label htmlFor="p-name">Name *</Label>
                <Input id="p-name" value={form.name} onChange={(e) => set("name", e.target.value)}
                  disabled={busy} maxLength={200} className="mt-1" />
              </div>

              <ImageUpload
                value={form.logoUrl ?? ""}
                onChange={(url) => set("logoUrl", url)}
                disabled={busy}
                label="Logo"
                hint="PNG or SVG on white/transparent background"
              />

              <div className="field mt-3">
                <Label htmlFor="p-websiteUrl">Website</Label>
                <Input id="p-websiteUrl" type="url" value={form.websiteUrl ?? ""}
                  onChange={(e) => set("websiteUrl", e.target.value)}
                  disabled={busy} placeholder="https://partner.com" className="mt-1" />
              </div>

              <div className="dash-lang-tabs mt-4" role="tablist">
                <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--muted)", padding: "7px 4px" }}>Description:</span>
                {LANGS.map((l) => (
                  <button key={l} type="button" role="tab" aria-selected={activeLang === l}
                    className={`dash-lang-tab${activeLang === l ? " is-active" : ""}`}
                    onClick={() => setActiveLang(l)}>
                    {l}
                  </button>
                ))}
              </div>

              {LANGS.map((l) => (
                <div key={l} style={{ display: activeLang === l ? "block" : "none" }} className="mt-2">
                  <Label htmlFor={`p-desc-${l}`}>Description {l}</Label>
                  <Textarea
                    id={`p-desc-${l}`}
                    rows={4}
                    value={(form[descKey(l)] as string) ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [descKey(l)]: e.target.value }))}
                    disabled={busy}
                    placeholder={`Partner description in ${l}…`}
                    className="mt-1"
                  />
                </div>
              ))}

              <div className="form-grid-2 mt-4">
                <div className="field">
                  <Label htmlFor="p-order">{t.dash.formOrder ?? "Order"}</Label>
                  <Input id="p-order" type="number" value={String(form.order)}
                    onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                    disabled={busy} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="p-active" style={{ display: "block", marginBottom: 8 }}>{t.dash.formActive ?? "Active"}</Label>
                  <div className="dash-check-wrap">
                    <input id="p-active" type="checkbox" className="dash-check" checked={form.isActive}
                      onChange={(e) => set("isActive", e.target.checked)}
                      disabled={busy} />
                    <span style={{ fontSize: ".875rem", color: "var(--text)" }}>
                      {form.isActive ? "Partner is visible" : "Partner is hidden"}
                    </span>
                  </div>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" form="partner-form" disabled={busy}>
                {busy ? "Saving…" : (editing ? t.dash.save : "Create Partner")}
              </Button>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
