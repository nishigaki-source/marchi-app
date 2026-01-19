import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import Button from './Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const LoginScreen = ({ title, description, colorClass, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // ログイン成功時に親コンポーネントの状態を更新
    } catch (err) {
      console.error(err);
      setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-6 mx-auto`}>
          <Lock className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h1>
        <p className="text-gray-500 text-center mb-8">{description}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID (Email)</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="admin@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button 
            onClick={handleLogin} 
            className="w-full py-3 mt-4" 
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 text-center mt-6">
          関係者専用のログイン画面です。<br/>一般ユーザーはアクセスできません。
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
