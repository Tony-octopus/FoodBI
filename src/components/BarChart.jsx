// Horizontal bar chart, hand-built with SVG so we control every "C":
//  - CONTEXT: an active, plain-language title states the takeaway; an axis
//    label gives the unit.
//  - CLUTTER-FREE: no gridlines, no legend, no boxed frame. Values are printed
//    directly at the end of each bar (data labels), so axes are unnecessary.
//  - CONTRAST: "start with gray" — every bar is gray except the single
//    highlighted category, drawn in the accent colour and echoed in the title.
//
// Horizontal orientation is chosen deliberately (Internationalization deck):
// it copes with variable-length category names in either language without
// truncation or rotated text.

const ROW_HEIGHT = 38;
const BAR_HEIGHT = 22;
const LABEL_WIDTH = 190; // room for longer French category names
const VALUE_PAD = 8;
const RIGHT_PAD = 70; // room for the value label
const TOP_PAD = 8;
const BOTTOM_PAD = 28; // room for the axis label

export default function BarChart({
  data, // [{ key, name, value, highlight }]
  formatValue, // (number) => localized string
  axisLabel,
  accent = '#e8590c',
  base = '#cbd0d6',
}) {
  const width = 720;
  const plotWidth = width - LABEL_WIDTH - RIGHT_PAD;
  const height = TOP_PAD + data.length * ROW_HEIGHT + BOTTOM_PAD;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(0, ...values);
  const minVal = Math.min(0, ...values);
  const span = maxVal - minVal || 1;

  // Map a data value to an x pixel within the plot area.
  const xOf = (v) => LABEL_WIDTH + ((v - minVal) / span) * plotWidth;
  const zeroX = xOf(0);

  return (
    <svg
      className="chart-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Zero baseline — the only reference line we keep. */}
      <line
        x1={zeroX}
        y1={TOP_PAD}
        x2={zeroX}
        y2={TOP_PAD + data.length * ROW_HEIGHT}
        stroke="#b4bac1"
        strokeWidth="1"
      />

      {data.map((d, i) => {
        const rowY = TOP_PAD + i * ROW_HEIGHT;
        const barY = rowY + (ROW_HEIGHT - BAR_HEIGHT) / 2;
        const valX = xOf(d.value);
        const barX = Math.min(zeroX, valX);
        const barW = Math.abs(valX - zeroX);
        const positive = d.value >= 0;
        const labelX = positive ? valX + VALUE_PAD : valX - VALUE_PAD;

        return (
          <g key={d.key}>
            {/* Category label (left column). */}
            <text
              x={LABEL_WIDTH - 12}
              y={rowY + ROW_HEIGHT / 2}
              textAnchor="end"
              dominantBaseline="central"
              className={d.highlight ? 'bar-cat bar-cat--hi' : 'bar-cat'}
            >
              {d.name}
            </text>

            {/* Bar. Highlighted category uses the accent colour. */}
            <rect
              x={barX}
              y={barY}
              width={barW}
              height={BAR_HEIGHT}
              rx="2"
              fill={d.highlight ? accent : base}
            />

            {/* Data label printed directly at the end of the bar. */}
            <text
              x={labelX}
              y={rowY + ROW_HEIGHT / 2}
              textAnchor={positive ? 'start' : 'end'}
              dominantBaseline="central"
              className={d.highlight ? 'bar-val bar-val--hi' : 'bar-val'}
            >
              {formatValue(d.value)}
            </text>
          </g>
        );
      })}

      {/* Axis label (unit). */}
      <text
        x={LABEL_WIDTH + plotWidth / 2}
        y={height - 8}
        textAnchor="middle"
        className="chart-axis-label"
      >
        {axisLabel}
      </text>
    </svg>
  );
}
