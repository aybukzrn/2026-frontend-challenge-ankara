import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LocationSearchBar from '../components/LocationSearchBar';
import { useInvestigationData } from '../hooks/useInvestigationData';

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

const sourceTypeLabel: Record<string, string> = {
  anonymousTips: 'Anonim İhbar',
  checkins: 'Check-in Kaydı',
  messages: 'Mesaj Kaydı',
  personalNotes: 'Kişisel Not',
  sightings: 'Gözlem Kaydı',
};

const sourceTypeTone: Record<string, string> = {
  anonymousTips: 'bg-blue-100 text-blue-800 border-blue-300',
  checkins: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  messages: 'bg-sky-100 text-sky-800 border-sky-300',
  personalNotes: 'bg-violet-100 text-violet-800 border-violet-300',
  sightings: 'bg-rose-100 text-rose-800 border-rose-300',
};

const formatFieldValue = (value: unknown): string => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const findConfidenceValue = (data: Record<string, unknown>): string | null => {
  const entry = Object.entries(data).find(([key]) => key.toLowerCase().includes('confidence'));
  if (!entry) return null;
  return String(entry[1]).trim().toLowerCase();
};

const confidenceTone = (confidence: string | null): { label: string; className: string } => {
  if (confidence === 'high') return { label: 'Güven: Yüksek', className: 'bg-green-100 text-green-800 border-green-300' };
  if (confidence === 'medium') return { label: 'Güven: Orta', className: 'bg-amber-100 text-amber-900 border-amber-300' };
  if (confidence === 'low') return { label: 'Güven: Düşük', className: 'bg-red-100 text-red-800 border-red-300' };
  return { label: 'Güven: Belirsiz', className: 'bg-slate-100 text-slate-700 border-slate-300' };
};

export default function PersonDetailPage() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { timeline, entities, loading, error, reload } = useInvestigationData();
  const decodedPerson = personId ? decodeURIComponent(personId) : '';
  const [locationFilter, setLocationFilter] = useState('');

  const personEvents = timeline
    .filter((event) => event.person.toLowerCase() === decodedPerson.toLowerCase())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredEvents = locationFilter
    ? personEvents.filter((e) => e.location.toLowerCase() === locationFilter.toLowerCase())
    : personEvents;

  if (loading) {
    return <div className="p-8 text-lg font-semibold">Kişi dosyası yükleniyor...</div>;
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbe4ee_0%,#f1f5f9_45%,#e2e8f0_100%)] flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:shrink-0">
        <Sidebar
          people={entities.people}
          selectedPerson={decodedPerson}
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
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm ${
                  person === decodedPerson
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 bg-slate-50 text-slate-700'
                }`}
              >
                {person}
              </button>
            ))}
          </div>
        </section>

        <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] rounded-lg p-4 sm:p-5 shadow-sm mb-6 border border-slate-300">
          <Link className="text-sm text-koyu_m hover:underline" to="/">
            ← Anasayfaya Dön
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">{decodedPerson || 'Kisi secilmedi'}</h1>
          <p className="text-slate-600 mt-1">
            Şüpheliye ait olaylar ve bilgiler aşağıda listelenmiştir. Toplam <strong>{personEvents.length}</strong> kayıt bulunmuştur.
          </p>
        </div>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] rounded-lg p-4 sm:p-5 shadow-sm border border-slate-300 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Dedektif Dosyası</h2>
            <LocationSearchBar
              locations={entities.locations}
              value={locationFilter}
              onChange={setLocationFilter}
            />
          </div>
          {locationFilter && (
            <p className="text-xs text-slate-500 mb-3">
              <strong>{filteredEvents.length}</strong> kayıt gösteriliyor — konum: <span className="font-semibold text-indigo-700">{locationFilter}</span>
            </p>
          )}

          {filteredEvents.length === 0 ? (
            <p className="text-slate-600">
              {locationFilter ? `"${locationFilter}" konumuna ait kayıt bulunamadı.` : 'Bu kişiye ait kayıt bulunamadı.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => {
                const typeLabel = sourceTypeLabel[event.type] ?? event.type;
                const typeTone = sourceTypeTone[event.type] ?? 'bg-slate-100 text-slate-800 border-slate-300';
                const sourceDataEntries = Object.entries(event.sourceRecord.data);
                const confidence = findConfidenceValue(event.sourceRecord.data);
                const confidenceBadge = confidenceTone(confidence);

                return (
                  <article
                    key={event.id}
                    className="rounded-lg border-2 border-slate-400 bg-[linear-gradient(180deg,#fefefe_0%,#f3f4f6_100%)] p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 justify-between border-b border-slate-400 pb-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-900 text-white tracking-wide">
                          DOSYA #{index + 1}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${typeTone}`}>
                          {typeLabel}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${confidenceBadge.className}`}>
                          {confidenceBadge.label}
                        </span>
                      </div>
                      <span className="text-xs text-slate-600 w-full sm:w-auto">Olay Tarihi: {formatDate(event.date)}</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 mb-3">

                      <div className="rounded border border-slate-300 bg-white p-3">
                        <p className="text-xs text-slate-500">Kişi</p>
                        <p className="text-sm font-semibold text-slate-800">{event.person}</p>
                      </div>
                      <div className="rounded border border-slate-300 bg-white p-3">
                        <p className="text-xs text-slate-500">Lokasyon</p>
                        <p className="text-sm font-semibold text-slate-800">{event.location}</p>
                      </div>
                  
                      <div className="rounded border border-slate-300 bg-white p-3 sm:col-span-2">
                        <p className="text-xs text-slate-500">Kayıt Oluşturma Zamanı</p>
                        <p className="text-sm font-semibold text-slate-800">{event.sourceRecord.createdAt}</p>
                      </div>
                    </div>

                    <div className="rounded border border-dashed border-slate-500 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Dosya Detayı:</p>
                      <dl className="grid gap-2 sm:grid-cols-2">
                        {sourceDataEntries.map(([key, value]) => (
                          <div key={`${event.id}-${key}`} className="rounded bg-slate-50 border border-slate-200 p-2">
                            <dt className="text-xs text-slate-500">{key}</dt>
                            <dd className="text-sm text-slate-800 break-words">{formatFieldValue(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
