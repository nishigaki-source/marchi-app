import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../../data/constants';
import ListingCard from '../../components/ListingCard';

const Home = ({ listings, setView, setActiveCategory, favorites, toggleFavorite, handleListingClick }) => {
  return (
    <>
      <div className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">地元の「やりたい」が見つかる</h1>
          <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="text-gray-400 mr-2" size={20} />
              <input type="text" placeholder="キーワード・エリア" className="w-full outline-none text-gray-700" />
            </div>
            <button onClick={() => setView('search')} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700">検索</button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">ジャンルから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setView('search'); }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center justify-center gap-2 h-32 group"
            >
              <div className={`p-3 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-indigo-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* New Listings */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">新着の掲載</h2>
            <button onClick={() => setView('search')} className="text-indigo-600 font-medium hover:underline">すべて見る</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.slice(0, 6).map(l => (
            <ListingCard key={l.id} listing={l} onClick={() => handleListingClick(l)} isFavorite={favorites.includes(l.id)} onToggleFavorite={() => toggleFavorite(l.id)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;