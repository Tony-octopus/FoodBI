// Data source: Statistics Canada. Table 18-10-0004-03
// "Consumer Price Index, monthly, percentage change, not seasonally adjusted,
//  Canada — Food". Release date: 2026-06-22.
// https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000403
//
// This is a hand-curated SUBSET of the published table (Canada geography).
// Each value is a Consumer Price Index (CPI) with base 2002 = 100.
// The three reference periods and the two percentage-change columns are copied
// directly from the source table. Category names are given in English and
// French (the French labels follow Statistics Canada's own terminology).

// The three reference periods shared by every series, stored as ISO dates so
// that they can be localized with Intl.DateTimeFormat.
export const PERIODS = ['2025-05-01', '2026-04-01', '2026-05-01'];

// CPI base for the selected series (used for context, not for currency).
export const INDEX_BASE = '2002=100';

// Curated food categories. Values: index at each period + month-over-month and
// year-over-year percentage change, exactly as reported in the source table.
export const FOOD_ITEMS = [
  {
    key: 'food',
    en: 'Food (all items)',
    fr: 'Aliments (tous les articles)',
    values: [195.4, 201.3, 202.8],
    mom: 0.7,
    yoy: 3.8,
  },
  {
    key: 'meat',
    en: 'Meat',
    fr: 'Viande',
    values: [221.2, 235.4, 234.4],
    mom: -0.4,
    yoy: 6.0,
  },
  {
    key: 'beef',
    en: 'Fresh or frozen beef',
    fr: 'Bœuf frais ou congelé',
    values: [285.4, 316.9, 323.5],
    mom: 2.1,
    yoy: 13.3,
  },
  {
    key: 'chicken',
    en: 'Fresh or frozen chicken',
    fr: 'Poulet frais ou congelé',
    values: [220.3, 224.8, 224.2],
    mom: -0.3,
    yoy: 1.8,
  },
  {
    key: 'milk',
    en: 'Fresh milk',
    fr: 'Lait frais',
    values: [181.1, 186.5, 185.9],
    mom: -0.3,
    yoy: 2.7,
  },
  {
    key: 'butter',
    en: 'Butter',
    fr: 'Beurre',
    values: [198.5, 200.7, 205.1],
    mom: 2.2,
    yoy: 3.3,
  },
  {
    key: 'cheese',
    en: 'Cheese',
    fr: 'Fromage',
    values: [157.7, 158.6, 158.9],
    mom: 0.2,
    yoy: 0.8,
  },
  {
    key: 'eggs',
    en: 'Eggs',
    fr: 'Œufs',
    values: [229.1, 223.4, 222.8],
    mom: -0.3,
    yoy: -2.7,
  },
  {
    key: 'bread',
    en: 'Bread, rolls and buns',
    fr: 'Pain, petits pains et brioches',
    values: [219.7, 230.8, 225.5],
    mom: -2.3,
    yoy: 2.6,
  },
  {
    key: 'apples',
    en: 'Apples',
    fr: 'Pommes',
    values: [218.6, 212.0, 224.0],
    mom: 5.7,
    yoy: 2.5,
  },
  {
    key: 'bananas',
    en: 'Bananas',
    fr: 'Bananes',
    values: [140.5, 153.4, 157.2],
    mom: 2.5,
    yoy: 11.9,
  },
  {
    key: 'tomatoes',
    en: 'Tomatoes',
    fr: 'Tomates',
    values: [139.3, 186.5, 202.2],
    mom: 8.4,
    yoy: 45.2,
  },
  {
    key: 'potatoes',
    en: 'Potatoes',
    fr: 'Pommes de terre',
    values: [163.5, 154.5, 160.8],
    mom: 4.1,
    yoy: -1.7,
  },
  {
    key: 'coffee',
    en: 'Coffee',
    fr: 'Café',
    values: [187.7, 214.8, 215.2],
    mom: 0.2,
    yoy: 14.7,
  },
  {
    key: 'vegetables',
    en: 'Fresh vegetables',
    fr: 'Légumes frais',
    values: [192.5, 198.9, 209.8],
    mom: 5.5,
    yoy: 9.0,
  },
];

// Convenience lookup by key.
export const ITEM_BY_KEY = Object.fromEntries(
  FOOD_ITEMS.map((item) => [item.key, item]),
);
