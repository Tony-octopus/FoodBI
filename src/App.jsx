import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { STRINGS, LOCALES } from './i18n/strings.js';
import { formatMonthYear } from './utils/format.js';
import { PERIODS } from './data/foodData.js';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = STRINGS[lang];

  // Keep the document language in sync so the browser and assistive tech apply
  // the correct locale rules (part of localization / accessibility).
  useEffect(() => {
    document.documentElement.lang = LOCALES[lang].localeTag;
    document.title = t.appTitle;
  }, [lang, t.appTitle]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              {/* Simple, text-free food/graph glyph (no embedded words). */}
              <svg viewBox="0 0 24 24" width="26" height="26" focusable="false">
                <rect x="3" y="13" width="4" height="8" rx="1" fill="#e8590c" />
                <rect x="10" y="8" width="4" height="13" rx="1" fill="#2f8f5b" />
                <rect x="17" y="4" width="4" height="17" rx="1" fill="#0072b2" />
              </svg>
            </span>
            <div>
              <h1 className="app-title">{t.appTitle}</h1>
              <p className="app-subtitle">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Language selection lives permanently at the top-right. */}
          <LanguageSelector lang={lang} onChange={setLang} ariaLabel={t.langAria} />
        </div>
        <p className="app-source">{t.source}</p>
      </header>

      <main className="app-main">
        <Dashboard lang={lang} />
      </main>

      <footer className="app-footer">
        <span>{t.footer}</span>
        <span className="muted">
          {t.updated} {formatMonthYear(PERIODS[PERIODS.length - 1], lang)}
        </span>
      </footer>
    </div>
  );
}
