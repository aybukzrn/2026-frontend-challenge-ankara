import type { InvestigationData } from '../hooks/useInvestigationData';
import type { InvestigationFormKey, NormalizedRecord } from '../api/jotform';

export interface TimelineEvent {
  id: string;
  type: InvestigationFormKey;
  date: string;
  person: string;
  location: string;
  details: string;
  sourceRecord: NormalizedRecord;
}

export interface InvestigationEntities {
  people: string[];
  locations: string[];
}

const DATE_KEYS = ['date', 'created at', 'timestamp', 'time'];
const PERSON_KEYS = ['person', 'name', 'person name', 'full name', 'suspect', 'witness'];
const LOCATION_KEYS = ['location', 'place', 'address', 'where'];
const DETAILS_KEYS = ['details', 'message', 'note', 'description', 'tip', 'content'];

const normalizeKey = (key: string): string => key.trim().toLowerCase();

const pickFieldValue = (data: Record<string, unknown>, candidates: string[]): string => {
  const entries = Object.entries(data);
  for (const [rawKey, value] of entries) {
    const key = normalizeKey(rawKey);
    if (candidates.some((candidate) => key.includes(candidate))) {
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        return String(value);
      }
    }
  }
  return '';
};

const safeDateString = (value: string, fallback: string): string => {
  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }
  const fallbackParsed = Date.parse(fallback);
  if (!Number.isNaN(fallbackParsed)) {
    return new Date(fallbackParsed).toISOString();
  }
  return fallback;
};

const buildDetails = (record: NormalizedRecord): string => {
  const explicitDetails = pickFieldValue(record.data, DETAILS_KEYS);
  if (explicitDetails) return explicitDetails;

  const compact = Object.entries(record.data)
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' | ');

  return compact || 'Detay bulunamadi';
};

const mapRecordToTimelineEvent = (
  type: InvestigationFormKey,
  record: NormalizedRecord
): TimelineEvent => {
  const person = pickFieldValue(record.data, PERSON_KEYS) || 'Bilinmiyor';
  const location = pickFieldValue(record.data, LOCATION_KEYS) || 'Bilinmiyor';
  const dateCandidate = pickFieldValue(record.data, DATE_KEYS);
  const date = safeDateString(dateCandidate, record.createdAt);

  return {
    id: `${type}-${record.id}`,
    type,
    date,
    person,
    location,
    details: buildDetails(record),
    sourceRecord: record,
  };
};

export const aggregateTimelineEvents = (data: InvestigationData): TimelineEvent[] => {
  const events = (Object.entries(data) as Array<[InvestigationFormKey, NormalizedRecord[]]>)
    .flatMap(([type, records]) => records.map((record) => mapRecordToTimelineEvent(type, record)));

  return events.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
};

export const extractInvestigationEntities = (timeline: TimelineEvent[]): InvestigationEntities => {
  const peopleSet = new Set<string>();
  const locationsSet = new Set<string>();

  timeline.forEach((event) => {
    const person = event.person.trim();
    const location = event.location.trim();

    if (person && person.toLowerCase() !== 'bilinmiyor') {
      peopleSet.add(person);
    }
    if (location && location.toLowerCase() !== 'bilinmiyor') {
      locationsSet.add(location);
    }
  });

  return {
    people: [...peopleSet].sort((a, b) => a.localeCompare(b, 'tr')),
    locations: [...locationsSet].sort((a, b) => a.localeCompare(b, 'tr')),
  };
};
