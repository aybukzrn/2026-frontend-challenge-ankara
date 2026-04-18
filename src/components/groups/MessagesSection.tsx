import type { TimelineEvent } from '../../utils/timeline';
import EventGroupSection from './EventGroupSection';

interface MessagesSectionProps {
  events: TimelineEvent[];
}

export default function MessagesSection({ events }: MessagesSectionProps) {
  const filtered = events.filter((event) => event.type === 'messages');
  return (
    <EventGroupSection
      title="Messages"
      accentClassName="bg-sky-100 text-sky-700"
      events={filtered}
    />
  );
}
