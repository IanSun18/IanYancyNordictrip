
import React, { useState, useEffect } from 'react';
import { INFO_LINKS, TRANSPORT_LINKS } from '../constants';

const TabInfo: React.FC = () => {
  const [times, setTimes] = useState({
    norway: '',
    finland: '',
    sweden: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Norway & Sweden (CET/CEST - UTC+1)
      const optionsCET: Intl.DateTimeFormatOptions = { 
        timeZone: 'Europe/Oslo', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      };
      
      // Finland (EET/EEST - UTC+2)
      const optionsEET: Intl.DateTimeFormatOptions = { 
        timeZone: 'Europe/Helsinki', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      };

      setTimes({
        norway: new Intl.DateTimeFormat('zh-TW', optionsCET).format(now),
        sweden: new Intl.DateTimeFormat('zh-TW', optionsCET).format(now),
        finland: new Intl.DateTimeFormat('zh-TW', optionsEET).format(now)
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fadeIn pb-24">
        <h2 className="font-serif text-2xl font-bold mb-4 text-nordic-text px-1">實時時鐘</h2>
        
        {/* World Clocks */}
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="glass-card p-3 rounded-2xl text-center shadow-sm border border-blue-100/50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">挪威 / 瑞典</div>
                <div className="text-lg font-mono font-bold text-slate-700">{times.norway}</div>
                <div className="text-[10px] text-slate-400 mt-1">GMT+1</div>
            </div>
            <div className="glass-card p-3 rounded-2xl text-center shadow-sm border border-blue-100/50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">芬蘭</div>
                <div className="text-lg font-mono font-bold text-slate-700">{times.finland}</div>
                <div className="text-[10px] text-slate-400 mt-1">GMT+2</div>
            </div>
            <div className="glass-card p-3 rounded-2xl text-center shadow-sm border border-blue-100/50 flex flex-col justify-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">台灣</div>
                <div className="text-sm font-mono font-bold text-slate-500">
                    {new Intl.DateTimeFormat('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())}
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">GMT+8</div>
            </div>
        </div>

        <h2 className="font-serif text-2xl font-bold mb-4 text-nordic-text px-1">城市交通查詢</h2>
        
        {/* Transport Links */}
        <div className="grid grid-cols-1 gap-3 mb-8">
            {TRANSPORT_LINKS.map((link, idx) => (
                <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glass-card p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition group overflow-hidden relative"
                >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${link.bgClass.replace('bg-', 'bg-')}`}></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl ${link.bgClass} flex items-center justify-center ${link.colorClass} border border-white/50 shadow-inner group-hover:scale-110 transition duration-300`}>
                            <i className={`fa-solid ${link.icon} text-xl`}></i>
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">{link.title}</div>
                            <div className="text-xs text-slate-400 font-medium">官方交通時刻表與購票查詢</div>
                        </div>
                    </div>
                    <div className="text-slate-300 group-hover:text-slate-500 transition relative z-10">
                        <i className="fa-solid fa-up-right-from-square text-sm"></i>
                    </div>
                </a>
            ))}
        </div>

        <h2 className="font-serif text-2xl font-bold mb-4 text-nordic-text px-1">國家氣象站</h2>
        
        {/* Weather Links */}
        <div className="space-y-3 mb-8">
            {INFO_LINKS.map((link, idx) => (
                <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glass-card p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition group overflow-hidden relative"
                >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${link.bgClass.replace('bg-', 'bg-')}`}></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl ${link.bgClass} flex items-center justify-center ${link.colorClass} border border-white/50 shadow-inner group-hover:scale-110 transition duration-300`}>
                            <i className={`fa-solid ${link.icon} text-xl`}></i>
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">{link.title}</div>
                            <div className="text-xs text-slate-400 font-medium">官方即時天氣與預報系統</div>
                        </div>
                    </div>
                    <div className="text-slate-300 group-hover:text-slate-500 transition relative z-10">
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </a>
            ))}
        </div>

        {/* Emergency */}
        <div className="glass-card rounded-2xl p-5 shadow-sm mb-6 border-l-4 border-red-400 relative">
            <h3 className="font-bold text-lg mb-2 text-red-500 relative z-10">緊急聯絡</h3>
            <ul className="text-sm space-y-3 text-slate-700 relative z-10">
                <li className="flex items-center"><span className="w-24 font-bold text-slate-900">歐盟緊急：</span> 112</li>
                <li className="flex items-center"><span className="w-24 font-bold text-slate-900">外交部急難：</span> <a href="tel:+886800085095" className="underline decoration-red-200">+886-800-085-095</a></li>
            </ul>
        </div>
        
        {/* Embassy */}
        <div className="glass-card rounded-2xl p-5 shadow-sm mb-6 relative">
            <h3 className="font-bold text-lg mb-3 relative z-10 flex items-center text-slate-800">
                <i className="fa-solid fa-building-flag mr-2 text-indigo-500"></i> 台灣駐外辦事處
            </h3>
            
            <div className="mb-4 border-b border-slate-200/60 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-slate-700 flex items-center">
                        <span className="mr-2 text-lg">🇸🇪 🇳🇴</span> 駐瑞典代表團
                    </h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">轄挪威</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 ml-1">
                    <li className="flex items-start"><i className="fa-solid fa-phone w-5 mt-0.5 text-blue-400 text-center"></i> <a href="tel:+4687288513" className="hover:text-blue-600 transition">+46-8-728 85 13</a></li>
                    <li className="flex items-start"><i className="fa-solid fa-kit-medical w-5 mt-0.5 text-red-400 text-center"></i> <span className="font-bold text-red-500 mr-1">急難救助：</span> <a href="tel:+46706755089" className="hover:text-red-700 transition">+46-70-675 50 89</a></li>
                    <li className="flex items-start"><i className="fa-solid fa-location-dot w-5 mt-0.5 text-slate-400 text-center"></i> Sveavägen 166, 18 tr, Stockholm</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-sm text-slate-700 flex items-center mb-2">
                    <span className="mr-2 text-lg">🇫🇮</span> 駐芬蘭代表處
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 ml-1">
                    <li className="flex items-start"><i className="fa-solid fa-phone w-5 mt-0.5 text-blue-400 text-center"></i> <a href="tel:+358968293800" className="hover:text-blue-600 transition">+358-9-6829 3800</a></li>
                    <li className="flex items-start"><i className="fa-solid fa-kit-medical w-5 mt-0.5 text-red-400 text-center"></i> <span className="font-bold text-red-500 mr-1">急難救助：</span> <a href="tel:+358405455678" className="hover:text-red-700 transition">+358-40-545 5678</a></li>
                    <li className="flex items-start"><i className="fa-solid fa-location-dot w-5 mt-0.5 text-slate-400 text-center"></i> Aleksanterinkatu 17, Helsinki</li>
                </ul>
            </div>
        </div>

        {/* Tips */}
        <div className="glass-card rounded-2xl p-5 shadow-sm mb-6 relative">
            <h3 className="font-bold text-lg mb-3 relative z-10 flex items-center text-slate-800"><i className="fa-solid fa-triangle-exclamation mr-2 text-amber-500"></i> 注意事項</h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 relative z-10">
                <div className="flex items-start p-2 bg-white/40 rounded-xl border border-white/50">
                    <i className="fa-solid fa-faucet-dotted text-blue-400 mt-1 mr-3 w-4 text-center"></i>
                    <span><strong>飲水：</strong> 自來水可生飲，極其純淨。</span>
                </div>
                <div className="flex items-start p-2 bg-white/40 rounded-xl border border-white/50">
                    <i className="fa-solid fa-wine-glass text-purple-400 mt-1 mr-3 w-4 text-center"></i>
                    <span><strong>酒類：</strong> 僅在專賣店販售，超市僅淡啤。</span>
                </div>
                <div className="flex items-start p-2 bg-white/40 rounded-xl border border-white/50">
                    <i className="fa-solid fa-coins text-yellow-500 mt-1 mr-3 w-4 text-center"></i>
                    <span><strong>小費：</strong> 無強制文化，服務費多已含。</span>
                </div>
                <div className="flex items-start p-2 bg-white/40 rounded-xl border border-white/50">
                    <i className="fa-solid fa-shirt text-emerald-500 mt-1 mr-3 w-4 text-center"></i>
                    <span><strong>穿著：</strong> 洋蔥式穿法，室內暖氣強。</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TabInfo;
