import React from 'react';
import { ItineraryItem, Accommodation } from '../types';

interface DailyCardProps {
  item: ItineraryItem;
  accommodation?: Accommodation;
}

const DailyCard: React.FC<DailyCardProps> = ({ item, accommodation }) => {
  const cardStyle = 'border-l-4 border-teal-400 shadow-lg shadow-teal-100/50';

  return (
    <div className={`glass-card rounded-2xl p-6 mb-24 ${cardStyle} animate-fadeIn relative overflow-hidden transition-all duration-300`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'100%25\\' height=\\'100%25\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'100\\' cy=\\'0\\' r=\\'80\\' stroke=\\'black\\' fill=\\'none\\' stroke-width=\\'1\\'/%3E%3C/svg%3E')", backgroundSize: '200px 200px', backgroundRepeat: 'no-repeat' }}></div>

      {item.time && (
        <div className="mb-4">
            <span className="w-full block text-center bg-red-100/90 text-red-600 text-sm px-3 py-2 rounded-lg font-bold animate-pulse border border-red-200 shadow-sm flex items-center justify-center gap-2">
                <i className="fa-solid fa-bell"></i> {item.time}
            </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 border-b border-slate-200/60 pb-3 relative z-10">
          <h3 className="font-bold text-xl text-slate-800 flex items-center flex-1 mr-2 leading-tight">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-slate-600 shadow-sm flex-shrink-0">
                  <i className={`fa-solid ${item.icon} text-lg`}></i>
              </div>
              {item.title}
          </h3>
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-slate-100/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200">{item.date}</span>
      </div>

      {/* Render HTML Content safely */}
      <div 
        className="text-[15px] text-slate-700 leading-7 relative z-10 font-medium" 
        dangerouslySetInnerHTML={{ __html: item.content }} 
      />

      <div className="flex justify-between items-center flex-wrap relative z-10 mt-2">
         {item.link && (
             <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-600 text-xs font-bold mt-3 inline-block relative z-10 hover:text-blue-800 transition">
                 <i className="fa-solid fa-map-location-dot mr-1"></i> 查看地圖
             </a>
         )}
      </div>

      {item.restaurant && (
        <div className="mt-6 pt-4 border-t border-slate-200/50 relative">
            <div className="flex items-center mb-2 relative z-10">
                <i className="fa-solid fa-utensils text-slate-400 mr-2"></i>
                <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider flex-1">Recommended Food</h4>
            </div>
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-lg flex justify-between items-center relative z-10 border border-orange-100 shadow-sm">
                <div>
                    <p className="font-bold text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: item.restaurant.name }} />
                    <p className="text-xs text-slate-500 mt-0.5">{item.restaurant.desc}</p>
                </div>
                <a href={item.restaurant.link} target="_blank" rel="noreferrer" className="text-orange-500 hover:text-orange-600 ml-2 text-lg p-1 transition"><i className="fa-solid fa-circle-arrow-right"></i></a>
            </div>
        </div>
      )}

      {/* Map Embeds */}
      {item.mapEmbedUrl ? (
        <div className="mt-4 rounded-xl overflow-hidden border border-white shadow-sm relative z-10">
            <iframe 
                width="100%" 
                height="250" 
                frameBorder="0" 
                scrolling="no" 
                src={item.mapEmbedUrl}
                title="map"
                style={{ filter: 'grayscale(10%)', opacity: 0.9 }}
            ></iframe>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-slate-600 flex justify-between items-center border-t border-slate-100">
                <span className="truncate pr-2"><i className="fa-solid fa-route mr-1 text-blue-500"></i> {item.location || 'Route Map'}</span>
                <span className="text-xs text-slate-400">Google Maps Route</span>
            </div>
        </div>
      ) : item.location ? (
        <div className="mt-4 rounded-xl overflow-hidden border border-white shadow-sm relative z-10">
             <iframe 
                width="100%" 
                height="180" 
                frameBorder="0" 
                scrolling="no" 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(item.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                title="map-single"
                style={{ filter: 'grayscale(10%)', opacity: 0.9 }}
            ></iframe>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-slate-600 flex justify-between items-center border-t border-slate-100">
                <span className="truncate pr-2"><i className="fa-solid fa-map-pin mr-1 text-red-400"></i> {item.location}</span>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`} target="_blank" rel="noreferrer" className="font-bold text-blue-600 whitespace-nowrap">開啟 App</a>
            </div>
        </div>
      ) : null}

      {accommodation && (
         <div className="mt-6 pt-4 border-t border-slate-200/50 relative">
            <div className="flex items-center mb-2 relative z-10">
                <i className="fa-solid fa-house-chimney text-slate-400 mr-2"></i>
                <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider flex-1">Night Stay</h4>
            </div>
            <div className="p-3 bg-slate-50/80 backdrop-blur-sm rounded-lg flex justify-between items-center relative z-10 border border-slate-100">
                <div>
                    <p className="font-bold text-sm text-slate-800">{accommodation.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{accommodation.address}</p>
                </div>
                {accommodation.mapLink ? (
                    <a href={accommodation.mapLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 ml-auto text-lg p-1 relative z-10 transition"><i className="fa-solid fa-map-location-dot"></i></a>
                ) : (
                    <span className="text-slate-400 ml-auto text-sm relative z-10"><i className="fa-solid fa-bed"></i></span>
                )}
            </div>
        </div>
      )}

    </div>
  );
};

export default DailyCard;