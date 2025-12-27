import React, { useState, useRef, useEffect } from 'react';
import { ITINERARY_DATA, ACCOMMODATION_DATA } from '../constants';
import DailyCard from './DailyCard';

const TabPlan: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleDayClick = (index: number) => {
    setCurrentDayIndex(index);
    btnRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  // Helper to find accommodation
  const getAccommodation = (dateString: string) => {
    const parts = dateString.split('/');
    if (parts.length < 2) return undefined;
    const dayMatch = parts[1].match(/(\d+)/);
    if (!dayMatch) return undefined;
    const day = parseInt(dayMatch[1], 10);
    return ACCOMMODATION_DATA.find(acc => day >= acc.startDay && day <= acc.endDay);
  };

  const currentItem = ITINERARY_DATA[currentDayIndex];
  const currentAccommodation = getAccommodation(currentItem.date);

  useEffect(() => {
     // Initial scroll
      btnRefs.current[0]?.scrollIntoView({ inline: 'center' });
  }, []);

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Day Selector */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar pb-4 gap-2 sticky top-0 z-10 pt-2 snap-x px-1"
      >
        {ITINERARY_DATA.map((item, index) => {
            const isActive = index === currentDayIndex;
            const activeClasses = 'bg-slate-800 text-white shadow-lg transform scale-105 border-slate-600 ring-2 ring-teal-400/50';
            const inactiveClasses = 'bg-white/60 backdrop-blur-md text-slate-500 border-white/50 shadow-sm border hover:bg-white/80';
            
            return (
                <button 
                    key={index}
                    ref={el => { btnRefs.current[index] = el; }}
                    className={`flex flex-col items-center justify-center min-w-[4.2rem] py-2 rounded-xl transition-all duration-300 snap-start border relative overflow-hidden group outline-none ${isActive ? activeClasses : inactiveClasses}`}
                    onClick={() => handleDayClick(index)}
                >
                    <span className="text-[9px] tracking-widest uppercase font-sans mb-0.5 relative z-10 font-bold opacity-80">{item.month}</span>
                    <span className="text-xl font-bold font-serif leading-none relative z-10">{item.dayNum}</span>
                </button>
            );
        })}
      </div>

      <div className="mt-2">
         <DailyCard item={currentItem} accommodation={currentAccommodation} />
      </div>
    </div>
  );
};

export default TabPlan;
