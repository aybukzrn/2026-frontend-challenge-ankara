import { useCallback, useEffect, useState } from 'react';
import {
  fetchFormData,
  INVESTIGATION_FORM_IDS,
  type InvestigationFormKey,
  type NormalizedRecord,
} from '../api/jotform';
import {
  aggregateTimelineEvents,
  extractInvestigationEntities,
  type InvestigationEntities,
  type TimelineEvent,
} from '../utils/timeline';

export type InvestigationData = Record<InvestigationFormKey, NormalizedRecord[]>;

const createEmptyData = (): InvestigationData => ({
  checkins: [],
  messages: [],
  sightings: [],
  personalNotes: [],
  anonymousTips: [],
});

interface UseInvestigationDataResult {
  data: InvestigationData;
  timeline: TimelineEvent[];
  entities: InvestigationEntities;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useInvestigationData = (): UseInvestigationDataResult => {
  const [data, setData] = useState<InvestigationData>(createEmptyData);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [entities, setEntities] = useState<InvestigationEntities>({ people: [], locations: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const entries = Object.entries(INVESTIGATION_FORM_IDS) as Array<[InvestigationFormKey, string]>;

      const parallelResults = await Promise.all(
        entries.map(async ([key, formId]) => {
          const records = await fetchFormData(formId);
          return [key, records] as const;
        })
      );

      const nextData = createEmptyData();
      parallelResults.forEach(([key, records]) => {
        nextData[key] = records;
      });

      const timelineEvents = aggregateTimelineEvents(nextData);
      setData(nextData);
      setTimeline(timelineEvents);
      setEntities(extractInvestigationEntities(timelineEvents));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Veri çekilirken beklenmeyen bir hata oluştu.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return {
    data,
    timeline,
    entities,
    loading,
    error,
    reload: loadData,
  };
};
