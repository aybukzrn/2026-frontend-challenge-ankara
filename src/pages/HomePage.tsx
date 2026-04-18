import { useInvestigationData } from '../hooks/useInvestigationData';

export default function HomePage() {
  const { timeline, entities, loading, error, reload } = useInvestigationData();

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
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-2">Investigation Dashboard</h1>
      <p className="text-slate-600 mb-6">
        Kisi ve lokasyon listeleri tum kaynaklardan uretilen timeline uzerinden otomatik cikariliyor.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Kisiler ({entities.people.length})</h2>
          <ul className="space-y-2 max-h-[420px] overflow-auto">
            {entities.people.map((person) => (
              <li key={person} className="px-3 py-2 rounded bg-slate-50 text-slate-800">
                {person}
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
        <h2 className="text-lg font-semibold mb-3">Timeline Ozeti</h2>
        <p className="text-slate-700">Toplam olay: {timeline.length}</p>
      </section>
    </div>
  );
}