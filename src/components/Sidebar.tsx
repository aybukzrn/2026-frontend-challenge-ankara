import { useState } from 'react';
interface SidebarProps {
  people: string[];
  selectedPerson?: string;
  onSelectPerson?: (person: string) => void;
}

export default function Sidebar({ people, selectedPerson, onSelectPerson }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`
        ${isOpen ? 'w-64' : 'w-16'} 
        min-h-screen bg-slate-900 text-slate-100 
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl border-r border-slate-800
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {isOpen && (
          <h2 className="text-lg font-bold tracking-wider text-indigo-400 whitespace-nowrap overflow-hidden truncate">
            SÜPHELİLER
          </h2>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors mx-auto"
          aria-label="Menüyü aç/kapat"
        >
          {isOpen ? (
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Kişiler Listesi */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin scrollbar-thumb-slate-700">
        <ul className="space-y-1 px-2">
          {people.map((person, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectPerson && onSelectPerson(person)}
                className={`
                  w-full flex items-center rounded-lg transition-colors border
                  ${selectedPerson === person ? 'bg-indigo-600/20 border-indigo-400/50' : 'border-transparent'}
                  ${isOpen ? 'px-3 py-2 hover:bg-slate-800' : 'justify-center p-2 hover:bg-slate-800'}
                `}
                title={person} // Menü kapalıyken üzerine gelince ismi görebilmek için
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <span className="text-xs font-medium text-slate-300">
                    {person.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {isOpen && (
                  <span className="ml-3 text-sm font-medium text-slate-300 whitespace-nowrap overflow-hidden truncate">
                    {person}
                  </span>
                )}
              </button>
            </li>
          ))}
          
          {isOpen && people.length === 0 && (
            <div className="text-xs text-slate-500 px-4 mt-4 text-center">
              Kayıt bulunamadı.
            </div>
          )}
        </ul>
      </div>
    </aside>
  );
}