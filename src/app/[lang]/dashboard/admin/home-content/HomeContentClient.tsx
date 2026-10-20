"use client";

import { useState } from "react";
import {
  useGetHomeContentQuery,
  useUpdateHomeContentMutation,
  type HomeContentItem,
} from "@/redux/fetchers/homeContent/homeContentApi";
import type { Dict } from "@/lib/i18n";

function prettyJson(v: unknown) {
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

export default function HomeContentClient({ t }: { t: Dict }) {
  const { data: items = [], isLoading } = useGetHomeContentQuery();
  const [updateContent, { isLoading: updating }] = useUpdateHomeContentMutation();

  const [editing, setEditing] = useState<HomeContentItem | null>(null);
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("{}");

  function openEdit(item: HomeContentItem) {
    setEditing(item);
    setJsonText(prettyJson(item.value));
    setError(""); setSuccess("");
  }

  async function handleSave() {
    if (!editing) return;
    setError("");
    let parsed: unknown;
    try { parsed = JSON.parse(jsonText); } catch { setError("Invalid JSON."); return; }
    try {
      await updateContent({ key: editing.key, value: parsed }).unwrap();
      setSuccess("Saved!");
      setTimeout(() => setSuccess(""), 2000);
      setEditing(null);
    } catch {
      setError("Save failed.");
    }
  }

  async function handleCreateNew() {
    setError("");
    if (!newKey.trim()) { setError("Key is required."); return; }
    let parsed: unknown;
    try { parsed = JSON.parse(newValue); } catch { setError("Invalid JSON value."); return; }
    try {
      await updateContent({ key: newKey.trim(), value: parsed }).unwrap();
      setSuccess("Created!");
      setShowAdd(false);
      setNewKey(""); setNewValue("{}");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setError("Create failed.");
    }
  }

  return (
    <div>
      <div className="dash-toolbar">
        <h1 className="dash-page-title">{t.dash.homeContent ?? "Home Content"}</h1>
        <button type="button" className="btn btn--primary" onClick={() => { setShowAdd(true); setError(""); }}>
          + {t.dash.add ?? "Add Key"}
        </button>
      </div>

      {success && <p className="notice notice--ok" style={{ marginBottom: 12 }}>{success}</p>}

      {showAdd && (
        <div className="settings-card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>New Key</h3>
          {error && <p className="err">{error}</p>}
          <div className="field">
            <label>Key</label>
            <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="e.g. hero_title" disabled={updating} />
          </div>
          <div className="field">
            <label>Value (JSON)</label>
            <textarea rows={4} value={newValue} onChange={(e) => setNewValue(e.target.value)} disabled={updating} style={{ fontFamily: "monospace", fontSize: "0.85rem" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="btn btn--primary" onClick={handleCreateNew} disabled={updating}>
              {updating ? "Saving…" : "Create"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => { setShowAdd(false); setError(""); }}>Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="muted">{t.common.loading}</p>
      ) : items.length === 0 ? (
        <div className="dash-empty"><p>{t.dash.noData}</p></div>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.key} className="settings-card" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <code style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.key}</code>
                {editing?.key !== item.key && (
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(item)}>
                    {t.dash.edit ?? "Edit"}
                  </button>
                )}
              </div>

              {editing?.key === item.key ? (
                <div style={{ marginTop: 10 }}>
                  {error && <p className="err">{error}</p>}
                  <textarea
                    rows={8}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    disabled={updating}
                    style={{ width: "100%", fontFamily: "monospace", fontSize: "0.82rem", marginBottom: 8 }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" className="btn btn--primary btn--sm" onClick={handleSave} disabled={updating}>
                      {updating ? "Saving…" : t.dash.save}
                    </button>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setEditing(null); setError(""); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <pre style={{ marginTop: 6, fontSize: "0.78rem", color: "var(--muted)", overflow: "auto", maxHeight: 100 }}>
                  {prettyJson(item.value)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
