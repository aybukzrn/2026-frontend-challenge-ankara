interface HeroCaseBannerProps {
  totalEvents: number;
  totalPeople: number;
  totalLocations: number;
  rangeStart: string;
  rangeEnd: string;
}

export default function HeroCaseBanner({
  totalEvents,
  totalPeople,
  totalLocations,
  rangeStart,
  rangeEnd,
}: HeroCaseBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border-2 border-slate-700 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#0b1120_100%)] p-6 shadow-lg">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/20 blur-2xl" />
      <div className="absolute right-20 bottom-0 h-24 w-24 rounded-full bg-sky-300/20 blur-xl" />

      <div className="relative z-10">
        <p className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
          Olay Dosyası
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-wide text-white sm:text-4xl">
          PODO NEREDE?
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-200 sm:text-base">
          Saha notları, ihbarlar ve görülme kayıtları tek dosyada toplandı. 
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-500/60 bg-slate-900/45 p-3">
            <p className="text-xs uppercase text-slate-300">Toplam Olay</p>
            <p className="text-2xl font-bold text-white">{totalEvents}</p>
          </div>
          <div className="rounded-lg border border-slate-500/60 bg-slate-900/45 p-3">
            <p className="text-xs uppercase text-slate-300">ŞÜPHELİ KİŞİLER</p>
            <p className="text-2xl font-bold text-white">{totalPeople}</p>
          </div>
          <div className="rounded-lg border border-slate-500/60 bg-slate-900/45 p-3">
            <p className="text-xs uppercase text-slate-300">Lokasyon</p>
            <p className="text-2xl font-bold text-white">{totalLocations}</p>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-dashed border-slate-500/70 bg-slate-900/40 px-3 py-2 text-xs text-slate-200">
          Zaman Aralığı: <span className="font-semibold text-amber-200">{rangeStart}</span> -{' '}
          <span className="font-semibold text-amber-200">{rangeEnd}</span>
        </div>
      </div>
    </section>
  );
}
