import type { TimelineEvent } from '../../utils/timeline';

interface EventGroupSectionProps {
  title: string;
  accentClassName: string;
  events: TimelineEvent[];
}

const formatDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function EventGroupSection({ title, accentClassName, events }: EventGroupSectionProps) {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${accentClassName}`}>{events.length} olay</span>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-slate-500">Bu grupta gosterilecek kayit yok.</p>
      ) : (
        <div className="space-y-3 max-h-[360px] overflow-auto">
          {events.map((event) => (
            <article key={event.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{formatDate(event.date)}</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {event.person} @ {event.location}
              </p>
              <p className="text-sm text-slate-600 mt-1">{event.details}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
