import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/AuthStore.js';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import WatchPage from './pages/WatchPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SearchHistoryPage from './pages/SearchHistoryPage.jsx';
import NotFoundPage from './pages/home/NotFoundPage.jsx';

function App() {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  console.log("auth is here: ", user);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    fetchAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex items-center justify-center bg-black h-full'>
          <Loader className='animate-spin size-10 text-red-600' aria-live="polite" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/watch/:id" element={!user ? <Navigate to="/login" /> : <WatchPage />} />
        <Route path="/search" element={!user ? <Navigate to="/login" /> : <SearchPage />} />
        <Route path="/history" element={!user ? <Navigate to="/login" /> : <SearchHistoryPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
