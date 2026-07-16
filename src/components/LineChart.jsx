// Multi-series line chart, hand-built with SVG. Line charts use 2D position,
// a pre-attentive attribute (Dashboards deck), so trends read at a glance.
//  - CLUTTER-FREE: few gridlines; NO legend — each series is labelled directly
//    at the end of its line (also more accessible for colour-blind users).
//  - CONTRAST: distinct hues per series, reinforced by the direct text label.
//  - CONTEXT: active title + y-axis unit label.

const TOP_PAD = 16;
const BOTTOM_PAD = 34;
const LEFT_PAD = 52;
const RIGHT_PAD = 168; // room for direct series labels (longer in French)

// Colour-blind-aware qualitative palette (Okabe–Ito based).
export const SERIES_COLORS = [
  '#0072b2',
  '#e8590c',
  '#009e73',
  '#cc79a7',
  '#8256d0',
  '#d55e00',
  '#4c4c4c',
  '#0aa5c2',
];

function niceTicks(min, max, count = 4) {
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, i) => min + step * i);
}

export default function LineChart({
  series, // [{ key, name, values: number[], color }]
  periodLabels, // localized x-axis labels, same length as values
  formatValue, // (number) => localized string for y ticks
  axisLabel,
}) {
  const width = 720;
  const height = 320;
  const plotW = width - LEFT_PAD - RIGHT_PAD;
  const plotH = height - TOP_PAD - BOTTOM_PAD;

  const allValues = series.flatMap((s) => s.values);
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  // Pad the domain a little so lines don't touch the frame edges.
  const pad = (rawMax - rawMin) * 0.15 || 10;
  const yMin = Math.floor((rawMin - pad) / 10) * 10;
  const yMax = Math.ceil((rawMax + pad) / 10) * 10;
  const ySpan = yMax - yMin || 1;

  const n = periodLabels.length;
  const xOf = (i) => LEFT_PAD + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const yOf = (v) => TOP_PAD + plotH - ((v - yMin) / ySpan) * plotH;

  const ticks = niceTicks(yMin, yMax, 4);

  return (
    <svg
      className="chart-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Sparse horizontal gridlines with y-axis value labels. */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={LEFT_PAD}
            y1={yOf(t)}
            x2={LEFT_PAD + plotW}
            y2={yOf(t)}
            stroke="#e6e8eb"
            strokeWidth="1"
          />
          <text
            x={LEFT_PAD - 10}
            y={yOf(t)}
            textAnchor="end"
            dominantBaseline="central"
            className="chart-tick"
          >
            {formatValue(t)}
          </text>
        </g>
      ))}

      {/* X-axis period labels. */}
      {periodLabels.map((label, i) => (
        <text
          key={label}
          x={xOf(i)}
          y={height - 12}
          textAnchor="middle"
          className="chart-tick"
        >
          {label}
        </text>
      ))}

      {/* Series lines, points, and direct end-of-line labels. */}
      {series.map((s) => {
        const points = s.values.map((v, i) => `${xOf(i)},${yOf(v)}`).join(' ');
        const lastX = xOf(s.values.length - 1);
        const lastY = yOf(s.values[s.values.length - 1]);
        return (
          <g key={s.key}>
            <polyline
              points={points}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {s.values.map((v, i) => (
              <circle key={i} cx={xOf(i)} cy={yOf(v)} r="3.5" fill={s.color} />
            ))}
            <text
              x={lastX + 10}
              y={lastY}
              dominantBaseline="central"
              className="line-label"
              fill={s.color}
            >
              {s.name}
            </text>
          </g>
        );
      })}

      {/* Y-axis unit label (rotated). */}
      <text
        x={14}
        y={TOP_PAD + plotH / 2}
        transform={`rotate(-90 14 ${TOP_PAD + plotH / 2})`}
        textAnchor="middle"
        className="chart-axis-label"
      >
        {axisLabel}
      </text>
    </svg>
  );
}
