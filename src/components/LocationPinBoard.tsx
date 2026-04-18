import type { TimelineEvent } from '../utils/timeline';

interface LocationPinBoardProps {
  events: TimelineEvent[];
}

interface PinPoint {
  id: string;
  location: string;
  people: string[];
  eventCount: number;
  x: number;
  y: number;
}

interface ConnectionLine {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const parseCoordinates = (event: TimelineEvent): { lat: number; lon: number } | null => {
  const entry = Object.entries(event.sourceRecord.data).find(([key]) =>
    key.toLowerCase().includes('coordinate')
  );
  if (!entry) return null;

  const [latRaw, lonRaw] = String(entry[1]).split(',').map((part) => part.trim());
  const lat = Number(latRaw);
  const lon = Number(lonRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
};

const clampPercent = (value: number): number => {
  if (value < 8) return 8;
  if (value > 92) return 92;
  return value;
};

export default function LocationPinBoard({ events }: LocationPinBoardProps) {
  const coordEvents = events
    .map((event) => ({ event, coord: parseCoordinates(event) }))
    .filter((item): item is { event: TimelineEvent; coord: { lat: number; lon: number } } => item.coord !== null);

  if (coordEvents.length === 0) {
    return (
      <section className="mt-6 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Lokasyon Pin Panosu</h2>
        <p className="text-sm text-slate-600">
          Harita pimi için uygun koordinat kaydı bulunamadı.
        </p>
      </section>
    );
  }

  const lats = coordEvents.map((item) => item.coord.lat);
  const lons = coordEvents.map((item) => item.coord.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const latRange = maxLat - minLat || 1;
  const lonRange = maxLon - minLon || 1;

  const sortedCoordEvents = [...coordEvents].sort(
    (a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
  );

  const grouped = new Map<string, { location: string; people: Set<string>; count: number; lat: number; lon: number }>();

  sortedCoordEvents.forEach(({ event, coord }) => {
    const key = `${event.location}|${coord.lat.toFixed(5)}|${coord.lon.toFixed(5)}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.people.add(event.person);
      existing.count += 1;
    } else {
      grouped.set(key, {
        location: event.location,
        people: new Set([event.person]),
        count: 1,
        lat: coord.lat,
        lon: coord.lon,
      });
    }
  });

  const points: PinPoint[] = Array.from(grouped.entries()).map(([id, value]) => {
    const x = clampPercent(((value.lon - minLon) / lonRange) * 100);
    const y = clampPercent((1 - (value.lat - minLat) / latRange) * 100);
    return {
      id,
      location: value.location,
      people: Array.from(value.people).sort((a, b) => a.localeCompare(b, 'tr')),
      eventCount: value.count,
      x,
      y,
    };
  });

  const pointById = new Map(points.map((point) => [point.id, point]));
  const orderedGroupKeys = sortedCoordEvents
    .map(({ event, coord }) => `${event.location}|${coord.lat.toFixed(5)}|${coord.lon.toFixed(5)}`)
    .filter((key, index, array) => index === 0 || array[index - 1] !== key);

  const connectionLines: ConnectionLine[] = orderedGroupKeys
    .slice(1)
    .map((toKey, index) => {
      const fromKey = orderedGroupKeys[index];
      if (fromKey === toKey) return null;
      const fromPoint = pointById.get(fromKey);
      const toPoint = pointById.get(toKey);
      if (!fromPoint || !toPoint) return null;
      return {
        id: `${fromKey}->${toKey}-${index}`,
        from: { x: fromPoint.x, y: fromPoint.y },
        to: { x: toPoint.x, y: toPoint.y },
      };
    })
    .filter((line): line is ConnectionLine => line !== null);

  return (
    <section className="mt-6 bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Lokasyon Pin Panosu</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative h-[500px] rounded-lg border border-slate-300 bg-[linear-gradient(180deg,#e0f2fe_0%,#dbeafe_45%,#f8fafc_100%)] overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_40%),radial-gradient(circle_at_80%_70%,#ffffff_0%,transparent_38%)]" />
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {connectionLines.map((line) => (
              <line
                key={line.id}
                x1={`${line.from.x}%`}
                y1={`${line.from.y}%`}
                x2={`${line.to.x}%`}
                y2={`${line.to.y}%`}
                stroke="#334155"
                strokeOpacity="0.45"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />
            ))}
          </svg>
          {points.map((point) => (
            <button
              key={point.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              title={`${point.location} | ${point.people.join(', ')}`}
            >
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded border border-slate-700 bg-slate-900/95 px-2 py-1 text-[10px] font-medium text-slate-100 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {point.location}
              </span>
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 border-2 border-white shadow-md">
                <span className="absolute h-5 w-5 rounded-full bg-rose-500/35 animate-ping" />
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 max-h-[500px] overflow-auto">
          <p className="text-sm font-semibold text-slate-800 mb-2">Baglanti Defteri</p>
          <ul className="space-y-2">
            {points.map((point) => (
              <li key={`${point.id}-legend`} className="rounded border border-slate-200 bg-white p-2">
                <p className="text-sm font-semibold text-slate-800">{point.location}</p>
                <p className="text-xs text-slate-500">{point.eventCount} olay</p>
                <p className="text-xs text-slate-700 mt-1">{point.people.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
