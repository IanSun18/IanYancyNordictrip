import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="glass-header shadow-lg px-6 py-5 flex justify-between items-center z-20 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div>
            <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300 bg-clip-text text-transparent relative z-10 drop-shadow-[0_2px_10px_rgba(45,212,191,0.3)]">Nordic Trip 2026</h1>
            <p className="text-[10px] text-slate-400 tracking-[0.25em] uppercase mt-1 relative z-10 font-medium">Jan 08 - Jan 24</p>
        </div>
        <div className="relative z-10">
            <i className="fa-solid fa-snowflake fa-xl animate-pulse text-cyan-200 drop-shadow-[0_0_8px_rgba(165,243,252,0.6)]"></i>
        </div>
    </header>
  );
};

export default Header;
