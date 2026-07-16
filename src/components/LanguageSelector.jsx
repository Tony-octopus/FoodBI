import { LOCALES } from '../i18n/strings.js';

// Language selection, designed per the Localization deck:
//  - Placed permanently at the top-right (see Dashboard layout), no scrolling
//    needed to reach it.
//  - NO national flags: a language is not a country. We use a neutral globe
//    icon plus text.
//  - Bilingual convention: the control shows the OTHER language written in that
//    language (e.g. while in English it reads "Français").
export default function LanguageSelector({ lang, onChange, ariaLabel }) {
  const other = lang === 'en' ? 'fr' : 'en';
  const target = LOCALES[other];

  return (
    <button
      type="button"
      className="lang-selector"
      onClick={() => onChange(other)}
      aria-label={ariaLabel}
      lang={other}
    >
      {/* Neutral international icon instead of a flag. */}
      <svg
        className="lang-globe"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <span>{target.label}</span>
    </button>
  );
}
