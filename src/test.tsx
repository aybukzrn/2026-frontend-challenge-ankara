import { useInvestigationData } from './hooks/useInvestigationData';

function App() {
    const { data, timeline, loading, error, reload } = useInvestigationData();

    // Yüklenme ve hata durumları
    if (loading) return <div className="p-8 text-xl font-semibold">Tum formlar paralel cekiliyor... 🕵️‍♂️</div>;
    if (error) {
        return (
            <div className="p-8">
                <p className="text-red-500 font-bold mb-4">Hata: {error}</p>
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
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-2">API Veri Test Ekranı</h1>
            <p className="mb-4 text-gray-600">
                Asagidaki cikti, farkli kaynaklardan gelen verinin ortak TimelineEvent formatina donusturulmus ve kronolojik siralanmis halidir.
            </p>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[600px] shadow-lg">
                <pre className="text-sm">
                    {JSON.stringify({ timeline, rawByForm: data }, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default App;