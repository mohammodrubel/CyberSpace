"use client";

import { useState } from "react";
import {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  type NewsItem,
  type CreateNewsInput,
} from "@/redux/fetchers/news/newsApi";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogForm,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import type { Dict, Locale } from "@/lib/i18n";

type Lang = "EN" | "AZ" | "RU";
const LANGS: Lang[] = ["EN", "AZ", "RU"];

interface TranslationForm { title: string; category: string; excerpt: string; body: string; }

interface FormState {
  slug: string; imageUrl: string; authorName: string;
  status: "DRAFT" | "PUBLISHED"; publishedAt: string; order: string;
  EN: TranslationForm; AZ: TranslationForm; RU: TranslationForm;
}

const emptyTrans = (): TranslationForm => ({ title: "", category: "", excerpt: "", body: "" });
const emptyForm = (): FormState => ({
  slug: "", imageUrl: "", authorName: "", status: "DRAFT", publishedAt: "", order: "0",
  EN: emptyTrans(), AZ: emptyTrans(), RU: emptyTrans(),
});

function itemToForm(item: NewsItem): FormState {
  const byLang = (l: Lang) => item.translations.find((t) => t.lang === l);
  return {
    slug: item.slug, imageUrl: item.imageUrl ?? "", authorName: item.authorName ?? "",
    status: item.status, publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : "",
    order: String(item.order ?? 0),
    EN: { title: byLang("EN")?.title ?? "", category: byLang("EN")?.category ?? "", excerpt: byLang("EN")?.excerpt ?? "", body: byLang("EN")?.body ?? "" },
    AZ: { title: byLang("AZ")?.title ?? "", category: byLang("AZ")?.category ?? "", excerpt: byLang("AZ")?.excerpt ?? "", body: byLang("AZ")?.body ?? "" },
    RU: { title: byLang("RU")?.title ?? "", category: byLang("RU")?.category ?? "", excerpt: byLang("RU")?.excerpt ?? "", body: byLang("RU")?.body ?? "" },
  };
}

function formToPayload(f: FormState): CreateNewsInput {
  const translations = LANGS
    .filter((l) => f[l].title.trim())
    .map((l) => ({ lang: l, title: f[l].title.trim(), category: f[l].category.trim(), excerpt: f[l].excerpt.trim(), body: f[l].body.trim() }));
  return {
    slug: f.slug.trim(), imageUrl: f.imageUrl.trim() || undefined, authorName: f.authorName.trim() || undefined,
    status: f.status, publishedAt: f.publishedAt ? new Date(f.publishedAt).toISOString() : undefined,
    order: parseInt(f.order) || 0, translations,
  };
}

export default function NewsClient({ lang, t }: { lang: string; t: Dict }) {
  const { data: news = [], isLoading } = useGetNewsQuery();
  const [create, { isLoading: creating }] = useCreateNewsMutation();
  const [update, { isLoading: updating }] = useUpdateNewsMutation();
  const [deleteNews, { isLoading: deleting }] = useDeleteNewsMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [activeLang, setActiveLang] = useState<Lang>("EN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  function openCreate() {
    setEditing(null); setForm(emptyForm()); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function openEdit(item: NewsItem) {
    setEditing(item); setForm(itemToForm(item)); setError(""); setSuccess(""); setActiveLang("EN"); setOpen(true);
  }
  function handleOpenChange(v: boolean) {
    if (!v) { setOpen(false); setEditing(null); }
  }

  function setField(key: keyof Omit<FormState, "EN" | "AZ" | "RU">, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function setTransField(l: Lang, key: keyof TranslationForm, value: string) {
    setForm((prev) => ({ ...prev, [l]: { ...prev[l], [key]: value } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    if (!form.EN.title.trim()) { setError("English title is required."); return; }
    try {
      const payload = formToPayload(form);
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
      await deleteNews(pendingDeleteId).unwrap();
      setConfirmOpen(false);
      setPendingDeleteId(null);
    } catch {
      setConfirmOpen(false);
    }
  }

  const busy = creating || updating;
  const L = lang as Locale;

  function getTitle(item: NewsItem) {
    const trans = item.translations.find((x) => x.lang === L.toUpperCase()) ?? item.translations[0];
    return trans?.title ?? item.slug;
  }

  return (
    <div>
      <div className="dash-toolbar">
        <h1 className="dash-page-title">{t.dash.news ?? "News"}</h1>
        <Button type="button" onClick={openCreate}>+ {t.dash.add ?? "Add"}</Button>
      </div>

      {isLoading ? (
        <p className="muted">{t.common.loading}</p>
      ) : news.length === 0 ? (
        <div className="dash-empty">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>
          <p>{t.dash.noData}</p>
        </div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Slug</th>
                <th>{t.dash.status}</th>
                <th>{t.dash.date}</th>
                <th>{t.dash.actions}</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt="" className="dash-thumb" />
                      : <div className="dash-thumb-placeholder"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    }
                  </td>
                  <td>{getTitle(item)}</td>
                  <td><code className="dash-code">{item.slug}</code></td>
                  <td>
                    <span className={`status-badge ${item.status === "PUBLISHED" ? "status-badge--published" : "status-badge--draft"}`}>
                      {item.status === "PUBLISHED" ? (t.dash.published ?? "Published") : (t.dash.draft ?? "Draft")}
                    </span>
                  </td>
                  <td>{item.publishedAt ? formatDate(item.publishedAt, L) : "—"}</td>
                  <td className="dash-actions">
                    <Button type="button" variant="outline" size="sm" onClick={() => openEdit(item)}>{t.dash.edit ?? "Edit"}</Button>
                    <Button type="button" variant="destructive" size="sm" disabled={deleting} onClick={() => promptDelete(item.id)}>{t.dash.delete ?? "Delete"}</Button>
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
        title="Delete this article?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      {/* Create / Edit dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent size="xl" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Article" : "New Article"}</DialogTitle>
            <DialogDescription>Fill in article content for each language tab.</DialogDescription>
          </DialogHeader>

          <DialogForm id="news-form" onSubmit={handleSubmit} noValidate>
            <DialogBody>
              {error && <p className="pf-alert pf-alert--error" role="alert">{error}</p>}
              {success && <p className="notice notice--ok mb-3">{success}</p>}

              <div className="form-grid-2 mb-4">
                <div className="field">
                  <Label htmlFor="n-slug">Slug *</Label>
                  <Input id="n-slug" value={form.slug}
                    onChange={(e) => setField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    disabled={busy || !!editing} placeholder="my-article-slug" className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="n-authorName">Author</Label>
                  <Input id="n-authorName" value={form.authorName}
                    onChange={(e) => setField("authorName", e.target.value)}
                    disabled={busy} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="n-status">Status</Label>
                  <select id="n-status" className="field select mt-1 w-full" value={form.status}
                    onChange={(e) => setField("status", e.target.value as "DRAFT" | "PUBLISHED")} disabled={busy}>
                    <option value="DRAFT">{t.dash.draft ?? "Draft"}</option>
                    <option value="PUBLISHED">{t.dash.published ?? "Published"}</option>
                  </select>
                </div>
                <div className="field">
                  <Label htmlFor="n-publishedAt">Publish Date</Label>
                  <Input id="n-publishedAt" type="date" value={form.publishedAt}
                    onChange={(e) => setField("publishedAt", e.target.value)}
                    disabled={busy} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="n-order">{t.dash.formOrder ?? "Order"}</Label>
                  <Input id="n-order" type="number" value={form.order}
                    onChange={(e) => setField("order", e.target.value)}
                    disabled={busy} className="mt-1" />
                </div>
              </div>

              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setField("imageUrl", url)}
                disabled={busy}
                label="Cover Image"
                hint="JPG, PNG or WebP · recommended 1200×630"
              />

              <div className="dash-lang-tabs mt-4" role="tablist">
                {LANGS.map((l) => (
                  <button key={l} type="button" role="tab" aria-selected={activeLang === l}
                    className={`dash-lang-tab${activeLang === l ? " is-active" : ""}`}
                    onClick={() => setActiveLang(l)}>
                    {l}
                  </button>
                ))}
              </div>

              {LANGS.map((l) => (
                <div key={l} className="space-y-3 mt-3" style={{ display: activeLang === l ? "block" : "none" }}>
                  <div className="field">
                    <Label>Title {l} {l === "EN" ? "*" : ""}</Label>
                    <Input value={form[l].title} onChange={(e) => setTransField(l, "title", e.target.value)}
                      disabled={busy} className="mt-1" />
                  </div>
                  <div className="field">
                    <Label>Category {l}</Label>
                    <Input value={form[l].category} onChange={(e) => setTransField(l, "category", e.target.value)}
                      disabled={busy} placeholder="e.g. Products, Networking" className="mt-1" />
                  </div>
                  <div className="field">
                    <Label>Excerpt {l}</Label>
                    <Textarea rows={2} value={form[l].excerpt}
                      onChange={(e) => setTransField(l, "excerpt", e.target.value)}
                      disabled={busy} className="mt-1" />
                  </div>
                  <div className="field">
                    <Label>Body {l}</Label>
                    <Textarea
                      rows={8}
                      value={form[l].body}
                      onChange={(e) => setTransField(l, "body", e.target.value)}
                      disabled={busy}
                      placeholder={`Full article text in ${l}…`}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </DialogBody>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" form="news-form" disabled={busy}>
                {busy ? "Saving…" : (editing ? t.dash.save : "Create Article")}
              </Button>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
