import React, { useState } from 'react';
import { useLocalStorage } from '../utils';
import { CHECKLIST_DEFAULTS } from '../constants';
import { ChecklistItem } from '../types';

const TabLists: React.FC = () => {
  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>('nordic_checklist', CHECKLIST_DEFAULTS);
  const [memo, setMemo] = useLocalStorage<string>('nordic_memo', '');
  const [newTodo, setNewTodo] = useState('');
  const [saveStatus, setSaveStatus] = useState('儲存');

  const handleToggle = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setChecklist([...checklist, { id: Date.now(), text: newTodo.trim(), checked: false }]);
      setNewTodo('');
    }
  };

  const handleSaveMemo = () => {
      // Memo is already saved via the hook's setMemo, but we simulate a button action for UX
      setSaveStatus('已儲存');
      setTimeout(() => setSaveStatus('儲存'), 1500);
  };

  const parsedLinks = memo.match(/(https?:\/\/[^\s]+)/g) || [];

  return (
    <div className="animate-fadeIn pb-24">
        <h2 className="font-serif text-2xl font-bold mb-4 text-nordic-text px-1">清單 & 筆記</h2>
        
        {/* Checklist */}
        <div className="glass-card rounded-2xl p-5 shadow-sm mb-6 relative">
            <h3 className="font-bold text-lg mb-3 border-b border-slate-200/60 pb-2 relative z-10 flex items-center text-slate-700">
                <i className="fa-solid fa-clipboard-check mr-2 text-teal-600"></i> 行前準備
            </h3>
            <div className="space-y-2 relative z-10">
                {checklist.map(item => (
                    <div 
                        key={item.id} 
                        className="flex items-center gap-3 p-3 hover:bg-slate-50/50 rounded-xl cursor-pointer transition border border-transparent hover:border-slate-100"
                        onClick={() => handleToggle(item.id)}
                    >
                        <div className={`w-6 h-6 rounded-md border-2 ${item.checked ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'} flex items-center justify-center transition flex-shrink-0`}>
                            {item.checked && <i className="fa-solid fa-check text-white text-xs"></i>}
                        </div>
                        <span className={`${item.checked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'} flex-1`}>{item.text}</span>
                        <button onClick={(e) => handleDelete(e, item.id)} className="ml-auto text-slate-300 hover:text-red-400 px-2 py-1">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex gap-2 relative z-10">
                <input 
                    type="text" 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="新增項目..." 
                    className="flex-1 text-sm bg-white/50 px-4 py-2 rounded-xl focus:outline-none border border-white/50 focus:ring-2 focus:ring-blue-100"
                />
                <button 
                    onClick={handleAddTodo}
                    className="bg-teal-600 text-white w-10 h-10 rounded-xl hover:bg-teal-700 transition shadow-sm flex items-center justify-center"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>

        {/* Memo */}
        <div className="glass-card rounded-2xl p-5 shadow-sm relative">
            <div className="flex justify-between items-center mb-3 relative z-10">
                <h3 className="font-bold text-lg flex items-center text-slate-700">
                    <i className="fa-solid fa-pen-to-square mr-2 text-blue-600"></i> 備忘錄
                </h3>
                <button 
                    onClick={handleSaveMemo} 
                    className={`text-xs px-4 py-1.5 rounded-full font-bold transition ${saveStatus === '已儲存' ? 'bg-teal-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
                >
                    {saveStatus}
                </button>
            </div>
            <textarea 
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full h-48 bg-white/50 rounded-xl p-4 text-sm focus:outline-none resize-none relative z-10 border border-white/60 placeholder-slate-400 text-slate-700 leading-relaxed shadow-inner" 
                placeholder="輸入文字或網址..."
            ></textarea>
            {parsedLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                    {parsedLinks.map((url, idx) => (
                        <a 
                            key={idx} 
                            href={url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="bg-blue-100/80 backdrop-blur-sm text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold truncate max-w-[150px] inline-block hover:bg-blue-100 transition border border-blue-100 flex items-center"
                        >
                            <i className="fa-solid fa-link mr-1.5 text-[10px]"></i> 連結
                        </a>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default TabLists;
