import type { TimelineEvent } from '../../utils/timeline';
import EventGroupSection from './EventGroupSection';

interface AnonymousTipsSectionProps {
  events: TimelineEvent[];
}

export default function AnonymousTipsSection({ events }: AnonymousTipsSectionProps) {
  const filtered = events.filter((event) => event.type === 'anonymousTips');
  return (
    <EventGroupSection
      title="Anonymous Tips"
      accentClassName="bg-amber-100 text-amber-700"
      events={filtered}
    />
  );
}
