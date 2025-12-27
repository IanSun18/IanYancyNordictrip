import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import TabPlan from './components/TabPlan';
import TabShopping from './components/TabShopping';
import TabWallet from './components/TabWallet';
import TabInfo from './components/TabInfo';
import TabLists from './components/TabLists';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plan');

  return (
    <div className="font-sans antialiased h-screen flex flex-col overflow-hidden bg-nordic-bg">
      <Header />
      
      <main className="flex-1 overflow-y-auto no-scrollbar relative p-4 scroll-smooth">
        {activeTab === 'plan' && <TabPlan />}
        {activeTab === 'shopping' && <TabShopping />}
        {activeTab === 'wallet' && <TabWallet />}
        {activeTab === 'info' && <TabInfo />}
        {activeTab === 'lists' && <TabLists />}
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
