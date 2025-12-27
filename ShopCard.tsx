import React from 'react';
import { ShopItem } from '../types';

interface ShopCardProps {
  item: ShopItem;
}

const ShopCard: React.FC<ShopCardProps> = ({ item }) => {
  return (
    <div className="glass-card rounded-2xl p-5 shadow-sm mb-4 relative overflow-hidden transition hover:shadow-md">
        <div className="flex items-start gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl ${item.iconBgColor} flex items-center justify-center ${item.iconColor} flex-shrink-0 text-xl border border-white/50`}>
                <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                {item.address && (
                    <p className="text-xs text-slate-400 mt-0.5 mb-2 font-medium">
                        <i className="fa-solid fa-location-dot mr-1"></i>{item.address}
                    </p>
                )}
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    {item.description}
                </p>
                <div className="text-right">
                    <a href={item.googleMapsLink} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center w-8 h-8 bg-white ${item.iconColor} rounded-full border border-slate-100 hover:bg-slate-50 transition shadow-sm`}>
                        <i className="fa-solid fa-map-location-dot"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShopCard;
