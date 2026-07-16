// UI string catalogue (resource-file style) for the two supported locales.
// English is treated as one language among two, not as a privileged "source".
// French translations follow Statistics Canada terminology where possible.
//
// Localization notes applied here (see Internationalization/Translation decks):
//  - Text length variation: French labels are typically ~20-30% longer than
//    English; the layout leaves room for this.
//  - Punctuation: in French a non-breaking space precedes ':' and '%'. The
//    number formatter handles '%'; ':' spacing is handled in the strings.
//  - Acronyms: CPI (Consumer Price Index) becomes IPC (Indice des prix à la
//    consommation) in French.

export const LOCALES = {
  en: {
    label: 'English',
    // Bilingual language-selection convention: show the OTHER language, in
    // that language, so users always recognize where the switch takes them.
    switchTo: 'Français',
    localeTag: 'en-CA',
  },
  fr: {
    label: 'Français',
    switchTo: 'English',
    localeTag: 'fr-CA',
  },
};

export const STRINGS = {
  en: {
    appTitle: 'Canadian Food Price Tracker',
    appSubtitle:
      'How grocery prices are moving across Canada, based on the Consumer Price Index (CPI, base 2002 = 100).',
    langAria: 'Switch to French',
    updated: 'Last updated:',
    source: 'Source: Statistics Canada, Table 18-10-0004-03 (CPI — Food).',
    note: 'Values are index points (2002 = 100), not dollar prices. A higher index means prices have risen more since 2002.',

    // Bar chart card
    barContext:
      'Which foods changed the most in price? Each bar shows the percentage change for one food category.',
    barMetricLabel: 'Compare change over:',
    metricYoy: 'Year (May 2025 → May 2026)',
    metricMom: 'Month (April → May 2026)',
    barAxis: 'Price change (%)',
    barTitleYoy: (name, pct) => `${name} led yearly food-price increases (${pct})`,
    barTitleMom: (name, pct) => `${name} led monthly food-price increases (${pct})`,
    barTitleFlatYoy: 'Yearly price change by food category',
    barTitleFlatMom: 'Monthly price change by food category',

    // Line chart card
    lineContext:
      'Track the price index of the foods you care about across the three most recent reference periods.',
    lineSelectLabel: 'Foods to track:',
    lineAxis: 'Price index (2002 = 100)',
    lineTitle: (n) =>
      n === 1 ? 'Price-index trend for 1 food' : `Price-index trend for ${n} foods`,
    lineEmpty: 'Select at least one food to display the trend.',
    selectAll: 'Select all',
    clearAll: 'Clear',

    footer: 'Built for SEG3125 — Analysis and Design of User Interfaces.',
  },
  fr: {
    appTitle: 'Suivi des prix des aliments au Canada',
    appSubtitle:
      'Évolution des prix à l’épicerie au Canada, selon l’Indice des prix à la consommation (IPC, base 2002 = 100).',
    langAria: 'Passer à l’anglais',
    updated: 'Dernière mise à jour :',
    source: 'Source : Statistique Canada, tableau 18-10-0004-03 (IPC — Aliments).',
    note: 'Les valeurs sont des points d’indice (2002 = 100), et non des prix en dollars. Un indice plus élevé indique une hausse des prix depuis 2002.',

    barContext:
      'Quels aliments ont le plus changé de prix ? Chaque barre montre la variation en pourcentage d’une catégorie d’aliments.',
    barMetricLabel: 'Comparer la variation sur :',
    metricYoy: 'Un an (mai 2025 → mai 2026)',
    metricMom: 'Un mois (avril → mai 2026)',
    barAxis: 'Variation des prix (%)',
    barTitleYoy: (name, pct) =>
      `${name} : plus forte hausse annuelle des prix (${pct})`,
    barTitleMom: (name, pct) =>
      `${name} : plus forte hausse mensuelle des prix (${pct})`,
    barTitleFlatYoy: 'Variation annuelle des prix par catégorie',
    barTitleFlatMom: 'Variation mensuelle des prix par catégorie',

    lineContext:
      'Suivez l’indice des prix des aliments qui vous intéressent sur les trois périodes de référence les plus récentes.',
    lineSelectLabel: 'Aliments à suivre :',
    lineAxis: 'Indice des prix (2002 = 100)',
    lineTitle: (n) =>
      n === 1
        ? 'Évolution de l’indice des prix pour 1 aliment'
        : `Évolution de l’indice des prix pour ${n} aliments`,
    lineEmpty: 'Sélectionnez au moins un aliment pour afficher la tendance.',
    selectAll: 'Tout sélectionner',
    clearAll: 'Effacer',

    footer: 'Réalisé pour SEG3125 — Analyse et conception des interfaces utilisateur.',
  },
};
