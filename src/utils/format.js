import { LOCALES } from '../i18n/strings.js';

// Locale-aware formatting helpers. These demonstrate the localization concepts
// from the Internationalization / Localization decks:
//  - Decimal separator: '.' in en-CA vs ',' in fr-CA.
//  - Percent sign: French inserts a (non-breaking) space before '%'.
//  - Dates: month names and ordering follow the locale.

function tag(lang) {
  return LOCALES[lang]?.localeTag ?? 'en-CA';
}

// Format a plain number (e.g. an index value like 202.8 or 10 000).
export function formatNumber(value, lang, options = {}) {
  return new Intl.NumberFormat(tag(lang), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}

// Format a signed percentage (e.g. +3.8 % / -2,7 %). Intl handles the locale
// specifics: fr-CA renders "3,8 %" (comma + narrow no-break space) while en-CA
// renders "3.8%".
export function formatPercent(value, lang, { signed = true } = {}) {
  const formatter = new Intl.NumberFormat(tag(lang), {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: signed ? 'exceptZero' : 'auto',
  });
  // Source data stores percentages as whole numbers (3.8 == 3.8%), so divide.
  return formatter.format(value / 100);
}

// Format an ISO date string like "2026-05-01" as a localized month + year.
export function formatMonthYear(isoDate, lang) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(tag(lang), {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

// Short month + year (e.g. "May 2026" / "mai 2026") for compact axis labels.
export function formatMonthYearShort(isoDate, lang) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(tag(lang), {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
