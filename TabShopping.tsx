import React, { useState } from 'react';
import { SHOPPING_DATA } from '../constants';
import ShopCard from './ShopCard';

type LocationType = 'tromso' | 'abisko' | 'stockholm' | 'rovaniemi';

const TabShopping: React.FC = () => {
  const [currentLoc, setCurrentLoc] = useState<LocationType>('tromso');

  const filteredItems = SHOPPING_DATA.filter(item => item.location === currentLoc);
  
  // Group by category if needed, or just list them. 
  // Let's implement groupings for better UX as per original design.
  const diningItems = filteredItems.filter(i => i.category === 'dining');
  const otherItems = filteredItems.filter(i => i.category !== 'dining');

  const getBtnClass = (loc: LocationType) => {
      const active = "bg-slate-800 text-white border-slate-600";
      const inactive = "bg-white/60 text-slate-500 border-white/50";
      return `snap-start flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border outline-none ${currentLoc === loc ? active : inactive}`;
  };

  return (
    <div className="animate-fadeIn">
        <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="font-serif text-2xl font-bold text-nordic-text">景點 & 餐廳</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1 snap-x">
            <button onClick={() => setCurrentLoc('tromso')} className={getBtnClass('tromso')}>Tromsø</button>
            <button onClick={() => setCurrentLoc('abisko')} className={getBtnClass('abisko')}>Abisko</button>
            <button onClick={() => setCurrentLoc('stockholm')} className={getBtnClass('stockholm')}>Stockholm</button>
            <button onClick={() => setCurrentLoc('rovaniemi')} className={getBtnClass('rovaniemi')}>Rovaniemi</button>
        </div>

        <div className="pb-24">
            {diningItems.length > 0 && (
                <>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 mt-1 px-1 flex items-center">
                        <i className="fa-solid fa-utensils mr-2 text-orange-400"></i>餐廳美食
                    </h4>
                    {diningItems.map(item => <ShopCard key={item.id} item={item} />)}
                </>
            )}

            {otherItems.length > 0 && (
                <>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 mt-6 px-1 flex items-center">
                        <i className="fa-solid fa-camera mr-2 text-teal-400"></i>景點 & 購物
                    </h4>
                    {otherItems.map(item => <ShopCard key={item.id} item={item} />)}
                </>
            )}
            
            {filteredItems.length === 0 && (
                <div className="text-center text-slate-400 py-10">
                    暫無資料
                </div>
            )}
        </div>
    </div>
  );
};

export default TabShopping;
