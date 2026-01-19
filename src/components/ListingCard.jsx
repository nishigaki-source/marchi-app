import React from 'react';
import { Star } from 'lucide-react';
import Badge from './Badge';
import { CATEGORIES } from '../data/constants';

const ListingCard = ({ listing, horizontal, onClick, isFavorite, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === listing.type);
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group ${horizontal ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
      onClick={onClick}
    >
      <div className={`relative ${horizontal ? 'md:w-64 h-48 md:h-auto' : 'h-48'}`}>
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 left-2">
          {category && (
            <Badge color={category.badge}>{category.name}</Badge>
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:text-yellow-500 transition-colors"
        >
          <Star size={18} className={isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"} />
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">{listing.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{listing.businessName}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {listing.tags.map((tag, i) => (
              <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
        {horizontal && (
          <div className="mt-4 md:mt-0 flex items-end justify-end">
             <span className="text-indigo-600 font-bold">{listing.wage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
