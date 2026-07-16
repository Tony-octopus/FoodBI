import { useMemo, useState } from 'react';
import {
  FOOD_ITEMS,
  PERIODS,
  INDEX_BASE,
} from '../data/foodData.js';
import { STRINGS } from '../i18n/strings.js';
import {
  formatPercent,
  formatNumber,
  formatMonthYear,
  formatMonthYearShort,
} from '../utils/format.js';
import BarChart from './BarChart.jsx';
import LineChart, { SERIES_COLORS } from './LineChart.jsx';

const DEFAULT_SELECTION = ['tomatoes', 'coffee', 'beef', 'eggs'];

export default function Dashboard({ lang }) {
  const t = STRINGS[lang];
  const [metric, setMetric] = useState('yoy'); // 'yoy' | 'mom'
  const [selected, setSelected] = useState(DEFAULT_SELECTION);

  // --- Bar chart data: sorted descending, top category highlighted. ---
  const barData = useMemo(() => {
    const rows = FOOD_ITEMS.map((item) => ({
      key: item.key,
      name: item[lang],
      value: item[metric],
    })).sort((a, b) => b.value - a.value);
    return rows.map((row, i) => ({ ...row, highlight: i === 0 }));
  }, [lang, metric]);

  const topRow = barData[0];
  const barTitle = useMemo(() => {
    const pct = formatPercent(topRow.value, lang);
    if (topRow.value <= 0) {
      return metric === 'yoy' ? t.barTitleFlatYoy : t.barTitleFlatMom;
    }
    return metric === 'yoy'
      ? t.barTitleYoy(topRow.name, pct)
      : t.barTitleMom(topRow.name, pct);
  }, [topRow, metric, lang, t]);

  // --- Line chart data: user-selected series. ---
  const periodLabels = useMemo(
    () => PERIODS.map((p) => formatMonthYearShort(p, lang)),
    [lang],
  );

  const lineSeries = useMemo(() => {
    // Keep original item order for stable colour assignment.
    return FOOD_ITEMS.filter((item) => selected.includes(item.key)).map(
      (item, i) => ({
        key: item.key,
        name: item[lang],
        values: item.values,
        color: SERIES_COLORS[i % SERIES_COLORS.length],
      }),
    );
  }, [selected, lang]);

  function toggleItem(key) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  return (
    <div className="dashboard">
      {/* ---- Bar chart card ---- */}
      <section className="card" aria-labelledby="bar-title">
        <p className="card-context">{t.barContext}</p>

        <div className="controls" role="group" aria-label={t.barMetricLabel}>
          <span className="controls-label">{t.barMetricLabel}</span>
          <div className="segmented">
            <button
              type="button"
              className={metric === 'yoy' ? 'seg seg--on' : 'seg'}
              aria-pressed={metric === 'yoy'}
              onClick={() => setMetric('yoy')}
            >
              {t.metricYoy}
            </button>
            <button
              type="button"
              className={metric === 'mom' ? 'seg seg--on' : 'seg'}
              aria-pressed={metric === 'mom'}
              onClick={() => setMetric('mom')}
            >
              {t.metricMom}
            </button>
          </div>
        </div>

        <h2 id="bar-title" className="chart-title">
          {barTitle}
        </h2>

        <BarChart
          data={barData}
          formatValue={(v) => formatPercent(v, lang)}
          axisLabel={t.barAxis}
        />
      </section>

      {/* ---- Line chart card ---- */}
      <section className="card" aria-labelledby="line-title">
        <p className="card-context">{t.lineContext}</p>

        <div className="controls controls--column">
          <div className="controls-row">
            <span className="controls-label">{t.lineSelectLabel}</span>
            <div className="controls-actions">
              <button
                type="button"
                className="link-btn"
                onClick={() => setSelected(FOOD_ITEMS.map((i) => i.key))}
              >
                {t.selectAll}
              </button>
              <button
                type="button"
                className="link-btn"
                onClick={() => setSelected([])}
              >
                {t.clearAll}
              </button>
            </div>
          </div>
          <div className="checkbox-grid">
            {FOOD_ITEMS.map((item) => (
              <label key={item.key} className="checkbox">
                <input
                  type="checkbox"
                  checked={selected.includes(item.key)}
                  onChange={() => toggleItem(item.key)}
                />
                <span>{item[lang]}</span>
              </label>
            ))}
          </div>
        </div>

        <h2 id="line-title" className="chart-title">
          {t.lineTitle(lineSeries.length)}
        </h2>

        {lineSeries.length === 0 ? (
          <p className="empty-state">{t.lineEmpty}</p>
        ) : (
          <LineChart
            series={lineSeries}
            periodLabels={periodLabels}
            formatValue={(v) =>
              formatNumber(v, lang, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }
            axisLabel={t.lineAxis}
          />
        )}

        <p className="chart-caption">
          {t.note}
          <br />
          <span className="muted">
            {t.updated} {formatMonthYear(PERIODS[PERIODS.length - 1], lang)} · {INDEX_BASE}
          </span>
        </p>
      </section>
    </div>
  );
}
