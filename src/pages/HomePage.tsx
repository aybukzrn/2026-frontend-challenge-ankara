import { useInvestigationData } from '../hooks/useInvestigationData';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeroCaseBanner from '../components/HeroCaseBanner';
import LocationPinBoard from '../components/LocationPinBoard';
import AnonymousTipsSection from '../components/groups/AnonymousTipsSection';
import CheckinsSection from '../components/groups/CheckinsSection';
import MessagesSection from '../components/groups/MessagesSection';
import PersonalNotesSection from '../components/groups/PersonalNotesSection';
import SightingsSection from '../components/groups/SightingsSection';

export default function HomePage() {
  const navigate = useNavigate();
  const { timeline, entities, loading, error, reload } = useInvestigationData();
  const orderedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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

  const firstEvent = orderedTimeline[0];
  const lastEvent = orderedTimeline[orderedTimeline.length - 1];

  if (loading) {
    return <div className="p-8 text-lg font-semibold">Veriler toplaniyor...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 font-semibold mb-4">Hata: {error}</p>
        <button
          type="button"
          onClick={() => void reload()}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Tekrar dene
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:shrink-0">
        <Sidebar
          people={entities.people}
          onSelectPerson={(person) => navigate(`/person/${encodeURIComponent(person)}`)}
        />
      </div>

      <main className="flex-1 p-4 sm:p-6">
        <section className="lg:hidden mb-4 bg-white rounded-lg p-3 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">Hızlı Şüpheli Geçişi</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {entities.people.map((person) => (
              <button
                key={person}
                type="button"
                onClick={() => navigate(`/person/${encodeURIComponent(person)}`)}
                className="shrink-0 rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
              >
                {person}
              </button>
            ))}
          </div>
        </section>

        <HeroCaseBanner
          totalEvents={orderedTimeline.length}
          totalPeople={entities.people.length}
          totalLocations={entities.locations.length}
          rangeStart={firstEvent ? formatDate(firstEvent.date) : '-'}
          rangeEnd={lastEvent ? formatDate(lastEvent.date) : '-'}
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mt-6">
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Şüpheliler ({entities.people.length})</h2>
            <ul className="space-y-2 max-h-[420px] overflow-auto">
              {entities.people.map((person) => (
                <li key={person}>
                  <button
                    type="button"
                    onClick={() => navigate(`/person/${encodeURIComponent(person)}`)}
                    className="w-full text-left px-3 py-2 rounded bg-slate-50 text-slate-800 hover:bg-slate-200"
                  >
                    {person}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Lokasyonlar ({entities.locations.length})</h2>
            <ul className="space-y-2 max-h-[420px] overflow-auto">
              {entities.locations.map((location) => (
                <li key={location} className="px-3 py-2 rounded bg-slate-50 text-slate-800">
                  {location}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <LocationPinBoard events={orderedTimeline} />


        <section className="mt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Kaynak Grupları</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            <CheckinsSection events={orderedTimeline} />
            <SightingsSection events={orderedTimeline} />
            <MessagesSection events={orderedTimeline} />
            <PersonalNotesSection events={orderedTimeline} />
            <AnonymousTipsSection events={orderedTimeline} />
          </div>
        </section>
      </main>
    </div>
  );
}