import type { TimelineEvent } from '../../utils/timeline';
import EventGroupSection from './EventGroupSection';

interface CheckinsSectionProps {
  events: TimelineEvent[];
}

export default function CheckinsSection({ events }: CheckinsSectionProps) {
  const filtered = events.filter((event) => event.type === 'checkins');
  return (
    <EventGroupSection
      title="Checkins"
      accentClassName="bg-emerald-100 text-emerald-700"
      events={filtered}
    />
  );
}
