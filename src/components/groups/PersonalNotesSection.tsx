import type { TimelineEvent } from '../../utils/timeline';
import EventGroupSection from './EventGroupSection';

interface PersonalNotesSectionProps {
  events: TimelineEvent[];
}

export default function PersonalNotesSection({ events }: PersonalNotesSectionProps) {
  const filtered = events.filter((event) => event.type === 'personalNotes');
  return (
    <EventGroupSection
      title="Kişsel Notlar"
      accentClassName="bg-violet-100 text-violet-700"
      events={filtered}
    />
  );
}
