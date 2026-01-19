import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { CATEGORIES } from '../../data/constants';
import ListingCard from '../../components/ListingCard';

const Search = ({ listings, activeCategory, setActiveCategory, favorites, toggleFavorite, handleListingClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2"><SearchIcon /> 検索結果</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            すべて
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${activeCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {listings.length > 0 ? (
          listings.map(l => (
            <ListingCard key={l.id} listing={l} horizontal onClick={() => handleListingClick(l)} isFavorite={favorites.includes(l.id)} onToggleFavorite={() => toggleFavorite(l.id)} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            該当する掲載は見つかりませんでした。
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;