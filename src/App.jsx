import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, User, ArrowRight } from 'lucide-react';
import Button from './components/Button';
import Home from './features/user/Home';
import Search from './features/user/Search';
import Detail from './features/user/Detail';
import BusinessDashboard from './features/business/Dashboard';
import AdminConsole from './features/admin/AdminConsole';
import { INITIAL_LISTINGS, INITIAL_APPLICATIONS } from './data/constants';

// Firebase imports
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// ユーザー向けレイアウトコンポーネント
const UserLayout = ({ children, setView }) => (
  <div className="min-h-screen bg-white pb-20">
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">MARCHI</span>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" icon={User}>マイページ</Button>
        </div>
      </div>
    </header>

    <main>{children}</main>

    <footer className="bg-gray-50 border-t border-gray-200 py-12 text-sm text-gray-600 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-bold text-gray-900 mb-4">MARCHI</h5>
          <p className="text-xs">地域密着型プラットフォーム</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-900 mb-4">ユーザー向け</h5>
          <ul className="space-y-2">
            <li>ヘルプ</li>
            <li>利用規約</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-gray-900 mb-4">事業者の方へ</h5>
          <ul className="space-y-2">
            <li>掲載について</li>
            <li><a href="#/business" className="text-indigo-600 font-medium hover:underline flex items-center gap-1">事業者ログイン <ArrowRight size={12}/></a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  
  // ユーザー画面用のステート
  const [userView, setUserView] = useState('home'); // home, search, detail
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Firestoreからデータを取得
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setListings(data);
        } else {
            console.log("No listings found in Firestore, using initial data.");
        }
      } catch (error) {
        console.error("Error fetching listings: ", error);
      }
    };
    
    // Firebaseの設定が完了していないとエラーになるため、
    // 実際に接続できている場合のみ実行するようにtry-catchしています
    fetchListings();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApply = (listingId, data) => {
    const newApp = {
      id: Date.now(),
      listingId,
      applicantName: data.name,
      status: 'unread',
      appliedAt: new Date().toLocaleString(),
      message: data.message,
      isBillable: true
    };
    setApplications([newApp, ...applications]);
    showNotification('応募が完了しました！');
  };

  const handleCreateListing = () => {
    showNotification('新規作成画面へ（デモ）');
  };

  const handleApproveListing = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, adminStatus: 'approved', status: 'published' } : l));
    showNotification('掲載を承認しました');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setUserView('detail');
  };

  // フィルタリングロジック（メモ化）
  const activeListings = useMemo(() => {
    return listings.filter(l => 
      l.status === 'published' && 
      l.adminStatus === 'approved' &&
      (activeCategory === 'all' || l.type === activeCategory)
    );
  }, [listings, activeCategory]);


  // ルーティング分岐
  let content;
  if (route.startsWith('#/admin')) {
    content = (
      <AdminConsole 
        listings={listings} 
        applications={applications} 
        onApproveListing={handleApproveListing}
      />
    );
  } else if (route.startsWith('#/business')) {
    content = (
      <BusinessDashboard 
        listings={listings} 
        applications={applications} 
        onCreateListing={handleCreateListing}
      />
    );
  } else {
    // ユーザー画面 (UserLayoutでラップ)
    content = (
      <UserLayout setView={setUserView}>
        {userView === 'home' && (
          <Home 
            listings={activeListings} 
            setView={setUserView}
            setActiveCategory={setActiveCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            handleListingClick={handleListingClick}
          />
        )}
        {userView === 'search' && (
          <Search 
            listings={activeListings}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            handleListingClick={handleListingClick}
          />
        )}
        {userView === 'detail' && selectedListing && (
          <Detail 
            listing={selectedListing}
            onBack={() => setUserView('search')}
            onApply={handleApply}
            isFavorite={favorites.includes(selectedListing.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </UserLayout>
    );
  }

  return (
    <>
      {content}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom z-[110]">
          {notification}
        </div>
      )}
    </>
  );
}
