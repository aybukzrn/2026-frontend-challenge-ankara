import { useState } from 'react';
interface SidebarProps {
  people: string[];
  selectedPerson?: string;
  onSelectPerson?: (person: string) => void;
}

export default function Sidebar({ people, selectedPerson, onSelectPerson }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`
        ${isOpen ? 'w-64' : 'w-16'}
        h-screen sticky top-0 bg-[linear-gradient(180deg,#0f172a_0%,#111827_55%,#020617_100%)] text-slate-100
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl border-r border-slate-700/70
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700/80">
        {isOpen && (
          <h2 className="text-sm font-bold tracking-[0.2em] text-amber-300 whitespace-nowrap overflow-hidden truncate">
            ŞÜPHELİLER
          </h2>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-800/80 border border-transparent hover:border-slate-600 transition-colors mx-auto"
          aria-label="Menüyü aç/kapat"
        >
          {isOpen ? (
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Kişiler Listesi */}
      <div className="flex-1 overflow-x-hidden py-4">
        <ul className="space-y-1 px-2">
          {people.map((person, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectPerson && onSelectPerson(person)}
                className={`
                  w-full flex items-center rounded-lg transition-colors border
                  ${
                    selectedPerson === person
                      ? 'bg-amber-400/15 border-amber-300/50'
                      : 'border-transparent hover:bg-slate-800/70'
                  }
                  ${isOpen ? 'px-3 py-2' : 'justify-center p-2'}
                `}
                title={person} // Menü kapalıyken üzerine gelince ismi görebilmek için
              >
                <div className="w-8 h-8 rounded-full bg-slate-800/90 flex items-center justify-center shrink-0 border border-slate-600">
                  <span className="text-xs font-semibold text-slate-200">
                    {person.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {isOpen && (
                  <span className="ml-3 text-sm font-medium text-slate-200 whitespace-nowrap overflow-hidden truncate">
                    {person}
                  </span>
                )}
              </button>
            </li>
          ))}
          
          {isOpen && people.length === 0 && (
            <div className="text-xs text-slate-400 px-4 mt-4 text-center">
              Kayıt bulunamadı.
            </div>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="px-3 py-3 border-t border-slate-700/80 text-[11px] text-slate-400">
          Soruşturma paneli: bir supheli secerek dosyasini ac.
        </div>
      )}
    </aside>
  );
}