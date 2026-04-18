import type { TimelineEvent } from '../../utils/timeline';
import EventGroupSection from './EventGroupSection';

interface SightingsSectionProps {
  events: TimelineEvent[];
}

export default function SightingsSection({ events }: SightingsSectionProps) {
  const filtered = events.filter((event) => event.type === 'sightings');
  return (
    <EventGroupSection
      title="Sightings"
      accentClassName="bg-rose-100 text-rose-700"
      events={filtered}
    />
  );
}
