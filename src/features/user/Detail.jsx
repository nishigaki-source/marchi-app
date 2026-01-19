import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { CATEGORIES } from '../../data/constants';

const Detail = ({ listing, onBack, onApply, isFavorite, onToggleFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', agreed: false });
  const category = CATEGORIES.find(c => c.id === listing.type);

  const handleSubmit = () => {
    onApply(listing.id, formData);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4 pl-0"><ChevronRight className="rotate-180" size={16}/> 戻る</Button>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-64 relative">
          <img src={listing.imageUrl} className="w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8 text-white">
            <div>
              <div className="flex gap-2 mb-2">
                {category && <Badge color={category.badge}>{category.name}</Badge>}
                <span className="bg-white/20 px-2 py-1 rounded text-xs backdrop-blur-md">{listing.area}</span>
              </div>
              <h1 className="text-3xl font-bold">{listing.title}</h1>
            </div>
          </div>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <section>
              <h3 className="font-bold text-lg border-b pb-2 mb-3">詳細情報</h3>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </section>
            <section>
              <h3 className="font-bold text-lg border-b pb-2 mb-3">募集要項</h3>
              <p className="text-gray-700">{listing.requirements}</p>
            </section>
          </div>
          
          <div className="w-full md:w-80 space-y-4">
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-1">給与・料金</p>
                <p className="text-2xl font-bold text-indigo-600 mb-6">{listing.wage}</p>
                <Button className="w-full py-3 mb-2" onClick={() => setShowModal(true)}>
                  応募する
                </Button>
                <Button variant="secondary" className="w-full" onClick={onToggleFavorite}>
                  {isFavorite ? 'お気に入り解除' : '保存する'}
                </Button>
             </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-6 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">応募フォーム</h3>
              <button onClick={() => setShowModal(false)}><X className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <input 
                className="w-full border border-gray-300 rounded p-2" 
                placeholder="お名前" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <textarea 
                className="w-full border border-gray-300 rounded p-2 h-24" 
                placeholder="メッセージ"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.agreed}
                  onChange={e => setFormData({...formData, agreed: e.target.checked})}
                />
                <span className="text-sm text-gray-600">規約に同意する</span>
              </label>
              <Button className="w-full" disabled={!formData.name || !formData.agreed} onClick={handleSubmit}>送信</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
