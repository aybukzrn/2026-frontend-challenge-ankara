import { useInvestigationData } from '../hooks/useInvestigationData';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeroCaseBanner from '../components/HeroCaseBanner';
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
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar
        people={entities.people}
        onSelectPerson={(person) => navigate(`/person/${encodeURIComponent(person)}`)}
      />

      <main className="flex-1 p-6">
        <HeroCaseBanner
          totalEvents={orderedTimeline.length}
          totalPeople={entities.people.length}
          totalLocations={entities.locations.length}
          rangeStart={firstEvent ? formatDate(firstEvent.date) : '-'}
          rangeEnd={lastEvent ? formatDate(lastEvent.date) : '-'}
        />

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Kisiler ({entities.people.length})</h2>
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

        <section className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Hikaye Özeti</h2>
          <p className="text-slate-700">
            Toplam <strong>{orderedTimeline.length}</strong> olay var. Aralik:
            {' '}
            <strong>{firstEvent ? formatDate(firstEvent.date) : '-'}</strong>
            {' '}-&gt; <strong>{lastEvent ? formatDate(lastEvent.date) : '-'}</strong>.
          </p>
        </section>

        <section className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Zaman Cizelgesi</h2>

          {orderedTimeline.length === 0 ? (
            <p className="text-slate-600">Gosterilecek olay bulunamadi.</p>
          ) : (
            <div className="relative pl-8">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-300" />

              <div className="space-y-4">
                {orderedTimeline.map((event) => (
                  <article key={event.id} className="relative rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <span className="absolute -left-[1.57rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-700" />

                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{event.type}</p>
                    <p className="text-sm font-semibold text-slate-900">{formatDate(event.date)}</p>
                    <p className="text-sm text-slate-700 mt-1">
                      <strong>{event.person}</strong>
                      {' '}@ {event.location}
                    </p>
                    <p className="text-sm text-slate-600 mt-2">{event.details}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Kaynak Grupları</h2>
            <p className="text-sm text-slate-600">Her kaynak kendi bölümünde ayrı görünür.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
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