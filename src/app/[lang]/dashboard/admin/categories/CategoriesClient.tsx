"use client";

import { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  type Category,
  type CreateCategoryInput,
} from "@/redux/fetchers/category/categoryApi";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogForm,
} from "@/components/ui/dialog";
import type { Dict } from "@/lib/i18n";

interface FormState {
  slug: string;
  nameEN: string;
  nameAZ: string;
  nameRU: string;
  imageUrl: string;
  isActive: boolean;
  order: string;
}

const emptyForm = (): FormState => ({
  slug: "", nameEN: "", nameAZ: "", nameRU: "", imageUrl: "", isActive: true, order: "0",
});

function categoryToForm(c: Category): FormState {
  return {
    slug: c.slug, nameEN: c.nameEN, nameAZ: c.nameAZ, nameRU: c.nameRU,
    imageUrl: c.imageUrl ?? "", isActive: c.isActive, order: String(c.order),
  };
}

function formToPayload(f: FormState): CreateCategoryInput {
  return {
    slug: f.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    nameEN: f.nameEN.trim(), nameAZ: f.nameAZ.trim(), nameRU: f.nameRU.trim(),
    imageUrl: f.imageUrl.trim() || null,
    isActive: f.isActive,
    order: f.order ? parseInt(f.order) : 0,
  };
}

export default function CategoriesClient({ t }: { t: Dict }) {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [create, { isLoading: creating }] = useCreateCategoryMutation();
  const [update, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  function openCreate() {
    setEditing(null); setForm(emptyForm()); setError(""); setSuccess(""); setOpen(true);
  }
  function openEdit(c: Category) {
    setEditing(c); setForm(categoryToForm(c)); setError(""); setSuccess(""); setOpen(true);
  }
  function handleOpenChange(v: boolean) {
    if (!v) { setOpen(false); setEditing(null); }
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    if (!form.nameEN.trim()) { setError("English name is required."); return; }
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
      await deleteCategory(pendingDeleteId).unwrap();
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
        <h1 className="dash-page-title">{t.dash.categories ?? "Categories"}</h1>
        <Button type="button" onClick={openCreate}>+ {t.dash.add ?? "Add"}</Button>
      </div>

      {isLoading ? (
        <p className="muted">{t.common.loading}</p>
      ) : categories.length === 0 ? (
        <div className="dash-empty"><p>{t.dash.noData}</p></div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Slug</th>
                <th>EN</th>
                <th>AZ</th>
                <th>RU</th>
                <th>{t.dash.formOrder ?? "Order"}</th>
                <th>{t.dash.formActive ?? "Active"}</th>
                <th>{t.dash.actions}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>
                    {c.imageUrl
                      ? <img src={c.imageUrl} alt={c.nameEN} className="dash-thumb" />
                      : <div className="dash-thumb-placeholder"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    }
                  </td>
                  <td><code className="dash-code">{c.slug}</code></td>
                  <td>{c.nameEN}</td>
                  <td>{c.nameAZ}</td>
                  <td>{c.nameRU}</td>
                  <td>{c.order}</td>
                  <td>{c.isActive ? "✓" : "—"}</td>
                  <td className="dash-actions">
                    <Button type="button" variant="outline" size="sm" onClick={() => openEdit(c)}>{t.dash.edit ?? "Edit"}</Button>
                    <Button type="button" variant="destructive" size="sm" disabled={deleting} onClick={() => promptDelete(c.id)}>{t.dash.delete ?? "Delete"}</Button>
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
        title="Delete this category?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editing ? (t.dash.edit ?? "Edit") : (t.dash.add ?? "Add")} {t.dash.categories ?? "Category"}</DialogTitle>
            <DialogDescription>Set slug, multilingual names, image and sort order.</DialogDescription>
          </DialogHeader>

          <DialogForm id="category-form" onSubmit={handleSubmit} noValidate>
            <DialogBody>
              {error && <p className="err mb-3" role="alert">{error}</p>}
              {success && <p className="notice notice--ok mb-3">{success}</p>}

              <div className="field mb-3">
                <Label htmlFor="cat-slug">
                  Slug * <span className="text-xs text-[#5b6b82] ml-1">(auto-lowercased, spaces→hyphens)</span>
                </Label>
                <Input id="cat-slug" value={form.slug}
                  onChange={(e) => setField("slug", e.target.value)}
                  disabled={busy || !!editing} maxLength={60} placeholder="e.g. servers" className="mt-1" />
              </div>

              <div className="form-grid-3 mb-3">
                <div className="field">
                  <Label htmlFor="cat-en">Name EN *</Label>
                  <Input id="cat-en" value={form.nameEN}
                    onChange={(e) => setField("nameEN", e.target.value)}
                    disabled={busy} maxLength={100} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="cat-az">Name AZ</Label>
                  <Input id="cat-az" value={form.nameAZ}
                    onChange={(e) => setField("nameAZ", e.target.value)}
                    disabled={busy} maxLength={100} className="mt-1" />
                </div>
                <div className="field">
                  <Label htmlFor="cat-ru">Name RU</Label>
                  <Input id="cat-ru" value={form.nameRU}
                    onChange={(e) => setField("nameRU", e.target.value)}
                    disabled={busy} maxLength={100} className="mt-1" />
                </div>
              </div>

              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setField("imageUrl", url)}
                disabled={busy}
                label="Category Image / Icon"
                hint="PNG or SVG recommended"
              />

              <div className="form-grid-2 mt-3">
                <div className="field">
                  <Label htmlFor="cat-order">{t.dash.formOrder ?? "Order"}</Label>
                  <Input id="cat-order" type="number" min="0" value={form.order}
                    onChange={(e) => setField("order", e.target.value)}
                    disabled={busy} className="mt-1" />
                </div>
                <div className="field flex items-center gap-2 pt-6">
                  <input id="cat-active" type="checkbox" checked={form.isActive}
                    onChange={(e) => setField("isActive", e.target.checked)}
                    disabled={busy} style={{ width: 16, height: 16 }} />
                  <Label htmlFor="cat-active">{t.dash.formActive ?? "Active"}</Label>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" form="category-form" disabled={busy}>
                {busy ? "Saving…" : (editing ? t.dash.save : "Create Category")}
              </Button>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
