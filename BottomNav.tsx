import React from 'react';

interface BottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const getBtnClass = (id: string) => {
    const base = "nav-btn flex-1 min-w-[60px] h-full flex flex-col items-center justify-center transition relative z-10 group cursor-pointer border-none outline-none";
    const active = "text-teal-400";
    const inactive = "text-slate-400 hover:text-white";
    return `${base} ${activeTab === id ? active : inactive}`;
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)] h-[84px] flex items-center justify-evenly px-1 z-30 pb-5 pt-1 overflow-x-auto no-scrollbar relative border-t border-white/10 w-full shrink-0">
        <button onClick={() => setActiveTab('plan')} className={getBtnClass('plan')}>
            <i className="fa-solid fa-calendar-days text-xl mb-1.5 group-hover:scale-110 transition"></i>
            <span className="text-[10px] font-bold tracking-wide">行程</span>
        </button>
        <button onClick={() => setActiveTab('shopping')} className={getBtnClass('shopping')}>
            <i className="fa-solid fa-map-location-dot text-xl mb-1.5 group-hover:scale-110 transition"></i>
            <span className="text-[10px] font-bold tracking-wide">景點</span>
        </button>
        <button onClick={() => setActiveTab('wallet')} className={getBtnClass('wallet')}>
            <i className="fa-solid fa-wallet text-xl mb-1.5 group-hover:scale-110 transition"></i>
            <span className="text-[10px] font-bold tracking-wide">記帳</span>
        </button>
        <div className="w-px h-8 bg-slate-700 mx-1"></div>
        <button onClick={() => setActiveTab('info')} className={getBtnClass('info')}>
            <i className="fa-solid fa-circle-info text-xl mb-1.5 group-hover:scale-110 transition"></i>
            <span className="text-[10px] font-bold tracking-wide">資訊</span>
        </button>
        <button onClick={() => setActiveTab('lists')} className={getBtnClass('lists')}>
            <i className="fa-solid fa-list-check text-xl mb-1.5 group-hover:scale-110 transition"></i>
            <span className="text-[10px] font-bold tracking-wide">清單</span>
        </button>
    </nav>
  );
};

export default BottomNav;
