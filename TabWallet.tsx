import React, { useState, useRef } from 'react';
import { useLocalStorage, safeCalculate } from '../utils';
import { Expense } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TabWallet: React.FC = () => {
  const [rate, setRate] = useLocalStorage<string>('nordic_rate', '3.0');
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('nordic_expenses', []);
  const [amountInput, setAmountInput] = useState('');
  const [itemName, setItemName] = useState('');
  const [payer, setPayer] = useState('Ian');
  const [image, setImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatedAmount = safeCalculate(amountInput);
  const calculatedTWD = Math.round(calculatedAmount * parseFloat(rate || '0'));

  const handleAddExpense = () => {
    if (!itemName || !amountInput) {
        alert("請輸入名稱和金額");
        return;
    }
    const newExpense: Expense = {
        id: Date.now(),
        name: itemName,
        amountForeign: calculatedAmount,
        amountTWD: calculatedTWD,
        date: new Date().toLocaleDateString(),
        image: image,
        payer: payer
    };
    setExpenses([newExpense, ...expenses]);
    
    // Reset
    setItemName('');
    setAmountInput('');
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearExpenses = () => {
      if(window.confirm('確定要刪除所有記帳資料嗎？無法復原喔！')) {
          setExpenses([]);
      }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const maxWidth = 400;
              let width = img.width;
              let height = img.height;
              
              if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
              }
              canvas.width = width;
              canvas.height = height;
              ctx?.drawImage(img, 0, 0, width, height);
              setImage(canvas.toDataURL('image/jpeg', 0.6));
          };
          if (event.target?.result) {
            img.src = event.target.result as string;
          }
      };
      reader.readAsDataURL(file);
  };
  
  // Calculate Totals for Chart
  const totalByPayer = expenses.reduce((acc, curr) => {
      acc[curr.payer] = (acc[curr.payer] || 0) + curr.amountTWD;
      return acc;
  }, {} as Record<string, number>);
  
  const chartData = Object.keys(totalByPayer).map(key => ({ name: key, value: totalByPayer[key] }));
  const COLORS = ['#5D6D7E', '#A9DFBF', '#D4AC0D', '#F472B6'];

  return (
    <div className="animate-fadeIn pb-24">
       <h2 className="font-serif text-2xl font-bold mb-4 text-nordic-text px-1">旅費記帳</h2>

       {/* Calculator Card */}
       <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden border border-slate-700/50">
            <div className="absolute -right-6 -top-6 w-48 h-48 bg-teal-500 opacity-20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute -left-6 -bottom-6 w-48 h-48 bg-indigo-500 opacity-20 rounded-full blur-3xl mix-blend-screen"></div>
            
            <div className="flex justify-between items-center mb-4 relative z-10">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">匯率設定 (當地 -> 台幣)</label>
                <input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    step="0.1" 
                    className="w-20 bg-white/10 text-white text-center rounded-lg p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 border border-white/10 font-mono" 
                />
            </div>
            <div className="mt-2 relative z-10">
                <label className="text-xs text-slate-400 block mb-1">消費金額 (支援算式)</label>
                <div className="flex items-end gap-3 border-b border-slate-600 pb-2">
                    <input 
                        type="text" 
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        placeholder="例如: 120+50" 
                        className="flex-1 bg-transparent text-3xl font-mono focus:outline-none text-white placeholder-slate-600 font-light" 
                    />
                    <span className="text-sm mb-1 text-slate-400 font-medium">當地幣</span>
                </div>
                <div className="mt-4 text-right">
                    <span className="text-sm text-slate-400 mr-2">≈ NT$ </span>
                    <span className="text-4xl font-bold text-teal-300 drop-shadow-sm tracking-tight">{calculatedTWD.toLocaleString()}</span>
                </div>
            </div>
       </div>

       {/* Input Form */}
       <div className="glass-card rounded-2xl p-4 shadow-sm mb-6 relative">
            <div className="flex gap-2 mb-3 relative z-10">
                <input 
                    type="text" 
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="品項名稱 (如: 晚餐)" 
                    className="flex-[2] bg-white/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border border-white/50 text-slate-700 font-medium" 
                />
                <select 
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                    className="flex-1 bg-white/50 rounded-xl px-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border border-white/50 text-slate-700 font-medium"
                >
                    <option value="Ian">Ian</option>
                    <option value="Yancy">Yancy</option>
                    <option value="Shared">Shared</option>
                </select>
            </div>
            <div className="flex justify-between items-center relative z-10 gap-3">
                <label className={`flex-1 flex items-center justify-center gap-2 text-sm text-slate-600 bg-white/50 px-3 py-3 rounded-xl cursor-pointer hover:bg-white/80 transition border border-white/50 font-bold ${image ? 'text-green-600' : ''}`}>
                    <i className="fa-solid fa-camera text-slate-400"></i>
                    <span>{image ? "已選擇" : "拍照"}</span>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoUpload} 
                    />
                </label>
                <button 
                    onClick={handleAddExpense}
                    className="flex-1 bg-slate-800 text-white px-3 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-slate-700 transition flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> 加入
                </button>
            </div>
            {image && (
                <div className="mt-3 relative z-10">
                    <img src={image} alt="Preview" className="h-20 w-20 object-cover rounded-xl border-2 border-white shadow-sm" />
                </div>
            )}
       </div>

        {/* Expenses List */}
        <div className="space-y-3">
            {expenses.map((ex) => {
                 let payerColorClass = 'bg-slate-100 text-slate-500';
                 if (ex.payer === 'Ian') payerColorClass = 'bg-teal-100 text-teal-700 border border-teal-200';
                 else if (ex.payer === 'Yancy') payerColorClass = 'bg-pink-100 text-pink-700 border border-pink-200';
                 else if (ex.payer === 'Shared') payerColorClass = 'bg-orange-100 text-orange-700 border border-orange-200';

                 return (
                    <div key={ex.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm flex items-center justify-between animate-fadeIn relative border border-white/60">
                        <div className="flex items-center gap-4 relative z-10">
                            {ex.image ? (
                                <img src={ex.image} alt="receipt" className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                                    <i className="fa-solid fa-receipt"></i>
                                </div>
                            )}
                            <div>
                                <div className="font-bold text-slate-800 text-base">{ex.name}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 font-medium">{ex.date}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${payerColorClass}`}>{ex.payer}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <div className="font-bold text-slate-800 text-lg">NT$ {ex.amountTWD.toLocaleString()}</div>
                            <div className="text-xs text-slate-400 font-mono">¥ {ex.amountForeign}</div>
                        </div>
                    </div>
                 );
            })}
        </div>
        
        {expenses.length > 0 && (
            <div className="mt-8">
                 <div className="h-48 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `NT$ ${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
                <div className="text-center pb-4">
                    <button onClick={handleClearExpenses} className="text-xs text-red-400/80 underline hover:text-red-500 transition">
                        清除所有記帳資料
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default TabWallet;
