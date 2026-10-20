"use client";

import { useState } from "react";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  type Banner,
  type CreateBannerInput,
} from "@/redux/fetchers/banner/bannerApi";
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

const emptyForm = (): CreateBannerInput => ({
  titleEN: "", titleAZ: "", titleRU: "",
  subtitleEN: "", subtitleAZ: "", subtitleRU: "",
  descEN: "", descAZ: "", descRU: "",
  ctaText: "", ctaUrl: "", ctaText2: "", ctaUrl2: "",
  imageUrl: "", isActive: true, order: 0,
});

function bannerToForm(b: Banner): CreateBannerInput {
  return {
    titleEN: b.titleEN, titleAZ: b.titleAZ, titleRU: b.titleRU,
    subtitleEN: b.subtitleEN ?? "", subtitleAZ: b.subtitleAZ ?? "", subtitleRU: b.subtitleRU ?? "",
    descEN: b.descEN ?? "", descAZ: b.descAZ ?? "", descRU: b.descRU ?? "",
    ctaText: b.ctaText ?? "", ctaUrl: b.ctaUrl ?? "",
    ctaText2: b.ctaText2 ?? "", ctaUrl2: b.ctaUrl2 ?? "",
    imageUrl: b.imageUrl ?? "", isActive: b.isActive, order: b.order,
  };
}

function cleanPayload(form: CreateBannerInput): CreateBannerInput {
  return {
    titleEN: form.titleEN.trim(),
    titleAZ: form.titleAZ.trim(),
    titleRU: form.titleRU.trim(),
    subtitleEN: form.subtitleEN?.trim() || null,
    subtitleAZ: form.subtitleAZ?.trim() || null,
    subtitleRU: form.subtitleRU?.trim() || null,
    descEN: form.descEN?.trim() || null,
    descAZ: form.descAZ?.trim() || null,
    descRU: form.descRU?.trim() || null,
    ctaText: form.ctaText?.trim() || null,
    ctaUrl: form.ctaUrl?.trim() || null,
    ctaText2: form.ctaText2?.trim() || null,
    ctaUrl2: form.ctaUrl2?.trim() || null,
    imageUrl: form.imageUrl?.trim() || null,
    isActive: form.isActive,
    order: form.order,
  };
}

const langFieldKey = (lang: LangKey, field: "title" | "subtitle" | "desc") =>
  `${field}${lang}` as keyof CreateBannerInput;

export default function BannersClient({ t }: { t: Dict }) {
  const { data: banners = [], isLoading } = useGetBannersQuery();
  const [create, { isLoading: creating }] = useCreateBannerMutation();
  const [update, { isLoading: updating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: deleting }] = useDeleteBannerMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState<CreateBannerInput>(emptyForm());
  const [activeLang, setActiveLang] = useState<LangKey>("EN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState("");

  function openCreate() {
    setEditing(null); setForm(emptyForm()); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function openEdit(b: Banner) {
    setEditing(b); setForm(bannerToForm(b)); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function handleOpenChange(v: boolean) {
    if (!v) { setOpen(false); setEditing(null); }
  }

  function set(key: keyof CreateBannerInput, value: string | boolean | number | null) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.titleEN.trim()) { setError("English title is required."); return; }
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
    setDeleteError("");
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (pendingDeleteId == null) return;
    try {
      await deleteBanner(pendingDeleteId).unwrap();
      setConfirmOpen(false);
      setPendingDeleteId(null);
    } catch {
      setDeleteError("Delete failed. Please try again.");
    }
  }

  const busy = creating || updating;

  return (
    <div>
      <div className="dash-toolbar">
        <h1 className="dash-page-title">{t.dash.banners ?? "Banners"}</h1>
        <Button type="button" onClick={openCreate}>+ {t.dash.add ?? "Add"}</Button>
      </div>

      {isLoading ? (
        <p className="muted">{t.common.loading}</p>
      ) : banners.length === 0 ? (
        <div className="dash-empty"><p>{t.dash.noData}</p></div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title (EN)</th>
                <th>{t.dash.formOrder ?? "Order"}</th>
                <th>{t.dash.formActive ?? "Active"}</th>
                <th>{t.dash.actions}</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.imageUrl
                      ? <img src={b.imageUrl} alt="" className="dash-thumb" />
                      : <div className="dash-thumb-placeholder"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    }
                  </td>
                  <td>{b.titleEN}</td>
                  <td>{b.order}</td>
                  <td>
                    <span className={`status-badge ${b.isActive ? "status-badge--ok" : "status-badge--off"}`}>
                      {b.isActive ? "Active" : "Off"}
                    </span>
                  </td>
                  <td className="dash-actions">
                    <Button type="button" variant="outline" size="sm" onClick={() => openEdit(b)}>{t.dash.edit ?? "Edit"}</Button>
                    <Button type="button" variant="destructive" size="sm" disabled={deleting} onClick={() => promptDelete(b.id)}>{t.dash.delete ?? "Delete"}</Button>
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
        title="Delete this banner?"
        description={deleteError || "This action cannot be undone."}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      {/* Create / Edit dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent size="wide" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editing ? (t.dash.edit ?? "Edit") : (t.dash.add ?? "Add")} Banner</DialogTitle>
            <DialogDescription>Fill in the banner content for all languages.</DialogDescription>
          </DialogHeader>

          <DialogForm id="banner-form" onSubmit={handleSubmit} noValidate>
            <DialogBody>
              {error && <p className="pf-alert pf-alert--error" role="alert">{error}</p>}
              {success && <p className="notice notice--ok mb-3">{success}</p>}

              <div className="dash-lang-tabs mb-3" role="tablist">
                {LANGS.map((l) => (
                  <button key={l} type="button" role="tab" aria-selected={activeLang === l}
                    className={`dash-lang-tab${activeLang === l ? " is-active" : ""}`}
                    onClick={() => setActiveLang(l)}>
                    {l}
                  </button>
                ))}
              </div>

              {LANGS.map((l) => (
                <div key={l} className="space-y-3" style={{ display: activeLang === l ? "block" : "none" }}>
                  <div className="field">
                    <Label htmlFor={`b-title-${l}`}>Title {l} {l === "EN" ? "*" : ""}</Label>
                    <Input id={`b-title-${l}`}
                      value={(form[langFieldKey(l, "title")] as string) ?? ""}
                      onChange={(e) => set(langFieldKey(l, "title"), e.target.value)}
                      disabled={busy} maxLength={200} className="mt-1" />
                  </div>
                  <div className="field">
                    <Label htmlFor={`b-sub-${l}`}>Subtitle {l}</Label>
                    <Input id={`b-sub-${l}`}
                      value={(form[langFieldKey(l, "subtitle")] as string) ?? ""}
                      onChange={(e) => set(langFieldKey(l, "subtitle"), e.target.value)}
                      disabled={busy} maxLength={300} className="mt-1" />
                  </div>
                  <div className="field">
                    <Label htmlFor={`b-desc-${l}`}>Description {l}</Label>
                    <Textarea
                      id={`b-desc-${l}`}
                      rows={4}
                      value={(form[langFieldKey(l, "desc")] as string) ?? ""}
                      onChange={(e) => set(langFieldKey(l, "desc"), e.target.value)}
                      disabled={busy}
                      placeholder={`Description in ${l}…`}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}

              <div className="form-grid-2 mt-4">
                <div className="field">
                  <Label htmlFor="b-ctaText">CTA Text</Label>
                  <Input id="b-ctaText" value={form.ctaText ?? ""} onChange={(e) => set("ctaText", e.target.value)} disabled={busy} maxLength={100} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="b-ctaUrl">CTA URL</Label>
                  <Input id="b-ctaUrl" type="url" value={form.ctaUrl ?? ""} onChange={(e) => set("ctaUrl", e.target.value)} disabled={busy} maxLength={500} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="b-ctaText2">CTA Text 2</Label>
                  <Input id="b-ctaText2" value={form.ctaText2 ?? ""} onChange={(e) => set("ctaText2", e.target.value)} disabled={busy} maxLength={100} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="b-ctaUrl2">CTA URL 2</Label>
                  <Input id="b-ctaUrl2" type="url" value={form.ctaUrl2 ?? ""} onChange={(e) => set("ctaUrl2", e.target.value)} disabled={busy} maxLength={500} className="mt-1" />
                </div>
              </div>

              <div className="mt-4">
                <ImageUpload
                  value={form.imageUrl ?? ""}
                  onChange={(url) => set("imageUrl", url)}
                  disabled={busy}
                  label="Banner Image"
                  hint="JPG, PNG or WebP · max 5 MB · recommended 1920×600"
                />
              </div>

              <div className="form-grid-2 mt-3">
                <div className="field">
                  <Label htmlFor="b-order">Order</Label>
                  <Input id="b-order" type="number" value={String(form.order)}
                    onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                    disabled={busy} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="b-active" style={{ display: "block", marginBottom: 8 }}>Active</Label>
                  <div className="dash-check-wrap">
                    <input id="b-active" type="checkbox" className="dash-check" checked={form.isActive}
                      onChange={(e) => set("isActive", e.target.checked)}
                      disabled={busy} />
                    <span style={{ fontSize: ".875rem", color: "var(--text)" }}>
                      {form.isActive ? "Banner is visible" : "Banner is hidden"}
                    </span>
                  </div>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" form="banner-form" disabled={busy}>
                {busy ? "Saving…" : (editing ? t.dash.save : "Create Banner")}
              </Button>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
