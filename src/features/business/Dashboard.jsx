import React, { useState } from 'react';
import { LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import LoginScreen from '../../components/LoginScreen';
import { CATEGORIES } from '../../data/constants';

const Dashboard = ({ listings, applications, onCreateListing }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tab, setTab] = useState('dashboard');
  
  if (!isAuthenticated) {
    return (
      <LoginScreen 
        title="事業者ログイン" 
        description="掲載管理・応募者対応はこちらから" 
        colorClass="bg-gray-900"
        onLogin={() => setIsAuthenticated(true)} 
      />
    );
  }

  const myListings = listings; 
  const myApps = applications.filter(a => [1, 2].includes(a.listingId)); 
  const billableCount = myApps.filter(a => a.isBillable).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-400" />
            <span className="font-bold text-lg">MARCHI for Business</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">Sunny Cafe 様</span>
            <Button variant="dark" className="border border-gray-700 text-xs" onClick={() => setIsAuthenticated(false)} icon={LogOut}>ログアウト</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">今月の応募獲得数</p>
            <p className="text-3xl font-bold text-gray-900">{myApps.length} <span className="text-sm text-gray-400 font-normal">件</span></p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">課金対象（請求確定）</p>
            <p className="text-3xl font-bold text-indigo-600">{billableCount} <span className="text-sm text-gray-400 font-normal">件</span></p>
            <p className="text-xs text-gray-400 mt-2">※ 不正・重複は自動除外済</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">現在の掲載数</p>
            <p className="text-3xl font-bold text-gray-900">{myListings.length} <span className="text-sm text-gray-400 font-normal">件</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
          <div className="border-b border-gray-200 flex">
            <button 
              onClick={() => setTab('dashboard')} 
              className={`px-6 py-4 text-sm font-medium ${tab === 'dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              応募者管理
            </button>
            <button 
              onClick={() => setTab('listings')} 
              className={`px-6 py-4 text-sm font-medium ${tab === 'listings' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              掲載管理
            </button>
          </div>

          <div className="p-6">
            {tab === 'dashboard' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">ステータス</th>
                      <th className="px-4 py-3">応募者</th>
                      <th className="px-4 py-3">求人タイトル</th>
                      <th className="px-4 py-3">応募日時</th>
                      <th className="px-4 py-3">課金判定</th>
                      <th className="px-4 py-3">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {myApps.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                         <td className="px-4 py-3">
                           <Badge color={app.status === 'unread' ? 'red' : 'blue'}>
                             {app.status === 'unread' ? '未読' : '対応済'}
                           </Badge>
                         </td>
                         <td className="px-4 py-3 font-medium">{app.applicantName}</td>
                         <td className="px-4 py-3 text-gray-500">{listings.find(l => l.id === app.listingId)?.title.substring(0, 10)}...</td>
                         <td className="px-4 py-3 text-gray-500">{app.appliedAt}</td>
                         <td className="px-4 py-3">
                           {app.isBillable ? <Badge color="green">課金対象</Badge> : <Badge color="gray">対象外</Badge>}
                         </td>
                         <td className="px-4 py-3">
                           <Button variant="secondary" className="h-8 text-xs px-2">詳細</Button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'listings' && (
              <div className="space-y-4">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-700">掲載リスト</h3>
                   <Button variant="primary" icon={PlusCircle} onClick={onCreateListing}>新規作成</Button>
                 </div>
                 {myListings.map(l => {
                   const category = CATEGORIES.find(c => c.id === l.type);
                   return (
                   <div key={l.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img src={l.imageUrl} className="w-16 h-16 rounded object-cover bg-gray-100" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {l.adminStatus === 'approved' ? <Badge color="green">公開中</Badge> : <Badge color="orange">審査中</Badge>}
                            <span className="text-xs text-gray-500">{category?.name}</span>
                          </div>
                          <p className="font-bold text-gray-900">{l.title}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" className="text-xs">編集</Button>
                        <Button variant="ghost" className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50">停止</Button>
                      </div>
                   </div>
                 )})}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
