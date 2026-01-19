import React, { useState } from 'react';
import { ShieldAlert, LogOut, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import LoginScreen from '../../components/LoginScreen';

const AdminConsole = ({ listings, applications, onApproveListing }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <LoginScreen 
        title="運営管理コンソール" 
        description="内部関係者以外立ち入り禁止" 
        colorClass="bg-red-900"
        onLogin={() => setIsAuthenticated(true)} 
      />
    );
  }

  const pendingListings = listings.filter(l => l.adminStatus === 'pending');
  const totalRevenue = applications.filter(a => a.isBillable).length * 1000;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-red-200" />
            <span className="font-bold text-lg">MARCHI Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-red-100">管理者: 運営 太郎</span>
            <Button className="bg-red-800 text-white hover:bg-red-700 border border-red-700 text-xs" onClick={() => setIsAuthenticated(false)} icon={LogOut}>ログアウト</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
             <p className="text-xs text-gray-500">審査待ち案件</p>
             <p className="text-2xl font-bold text-gray-900">{pendingListings.length} <span className="text-xs">件</span></p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
             <p className="text-xs text-gray-500">今月の総応募</p>
             <p className="text-2xl font-bold text-gray-900">{applications.length} <span className="text-xs">件</span></p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
             <p className="text-xs text-gray-500">概算収益</p>
             <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
             <h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckCircle size={18} /> 審査キュー</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingListings.length === 0 ? (
              <div className="p-8 text-center text-gray-400">現在、審査待ちの案件はありません。</div>
            ) : (
              pendingListings.map(l => (
                <div key={l.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">ID: {l.id}</span>
                       <span className="text-sm font-bold text-gray-700">{l.businessName}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{l.title}</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 border border-gray-100 mb-2">
                       {l.description}
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                       <span>エリア: {l.area}</span>
                       <span>賃金: {l.wage}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center w-48">
                    <Button variant="success" onClick={() => onApproveListing(l.id)}>承認・公開</Button>
                    <Button variant="danger">却下・差し戻し</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;