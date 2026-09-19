"use client";

const PIE_SEGMENTS = [
  { key: "applied", label: "Applied", color: "#3b82f6" },
  { key: "test", label: "Tes", color: "#a855f7" },
  { key: "interviewHrd", label: "Interview HRD", color: "#f59e0b" },
  { key: "interviewUser", label: "Interview User", color: "#f97316" },
  { key: "offer", label: "Offer", color: "#10b981" },
  { key: "rejected", label: "Rejected", color: "#f43f5e" },
] as const;

type Counts = Record<(typeof PIE_SEGMENTS)[number]["key"], number>;

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 100;

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle, RADIUS);
  const end = polarToCartesian(endAngle, RADIUS);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

type Slice = {
  key: string;
  label: string;
  color: string;
  value: number;
  percent: number;
  path: string | null;
};

export default function StatusPieChart({
  counts,
  total,
}: {
  counts: Counts;
  total: number;
}) {
  if (total === 0) {
    return (
      <p className="text-sm text-zinc-500">Belum ada data buat ditampilkan.</p>
    );
  }

  const visibleSegments = PIE_SEGMENTS.filter((seg) => counts[seg.key] > 0);

  const { slices } = visibleSegments.reduce<{
    slices: Slice[];
    cursor: number;
  }>(
    (acc, seg) => {
      const value = counts[seg.key];
      const percent = Math.round((value / total) * 100);
      const angle = (value / total) * 360;
      const startAngle = acc.cursor;
      const endAngle = acc.cursor + angle;

      const slice: Slice = {
        ...seg,
        value,
        percent,
        path: angle >= 360 ? null : arcPath(startAngle, endAngle),
      };

      return {
        slices: [...acc.slices, slice],
        cursor: endAngle,
      };
    },
    { slices: [], cursor: 0 }
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 border border-zinc-300 rounded-xl">
      {/* Pie chart */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        height={SIZE}
        className="shrink-0"
      >
        {slices.map((s) =>
          s.path ? (
            <path
              key={s.key}
              d={s.path}
              fill={s.color}
              stroke="#fff"
              strokeWidth={2}
            />
          ) : (
            <circle
              key={s.key}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill={s.color}
            />
          )
        )}
      </svg>

      {/* Legend */}
      <ul className="space-y-2.5 w-full sm:w-auto">
        {slices.map((s) => (
          <li key={s.key} className="flex items-center gap-2.5 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-zinc-700 font-medium">{s.label}</span>
            <span className="text-zinc-400">
              {s.value} ({s.percent}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
