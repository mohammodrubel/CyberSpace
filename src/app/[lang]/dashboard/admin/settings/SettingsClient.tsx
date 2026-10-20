"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

export default function SettingsClient({
  initialSettings,
  t,
}: {
  initialSettings: { showPrices: boolean; showStock: boolean };
  t: Dict;
}) {
  const [showPrices, setShowPrices] = useState(initialSettings.showPrices);
  const [showStock, setShowStock] = useState(initialSettings.showStock);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function updateSetting(key: string, value: boolean) {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  function handlePrices(v: boolean) {
    setShowPrices(v);
    updateSetting("showPrices", v);
  }

  function handleStock(v: boolean) {
    setShowStock(v);
    updateSetting("showStock", v);
  }

  return (
    <div className="dash-settings">
      <div className="settings-card">
        <h2 className="settings-card__title">{t.dash.visibilitySettings}</h2>
        <p className="settings-card__note">{t.admin.hiddenNote}</p>

        <div className="settings-row">
          <div className="settings-row__info">
            <p className="settings-row__label">{t.dash.showPrices}</p>
          </div>
          <button
            type="button"
            className={`toggle-switch ${showPrices ? "toggle-switch--on" : ""}`}
            disabled={saving}
            onClick={() => handlePrices(!showPrices)}
            aria-pressed={showPrices}
            aria-label={t.dash.showPrices}
          >
            <span className="toggle-switch__knob" />
          </button>
        </div>

        <div className="settings-row">
          <div className="settings-row__info">
            <p className="settings-row__label">{t.dash.showStock}</p>
          </div>
          <button
            type="button"
            className={`toggle-switch ${showStock ? "toggle-switch--on" : ""}`}
            disabled={saving}
            onClick={() => handleStock(!showStock)}
            aria-pressed={showStock}
            aria-label={t.dash.showStock}
          >
            <span className="toggle-switch__knob" />
          </button>
        </div>

        {saved && <p className="settings-saved">{t.dash.saved}</p>}
      </div>
    </div>
  );
}
