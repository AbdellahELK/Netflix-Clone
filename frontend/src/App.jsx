import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/AuthStore.js';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  console.log("auth is here: ", user);

  useEffect(() => {
    // const fetchAuth = async () => {
    //   try {
    //     await checkAuth();
    //   } catch (error) {
    //     console.error("Error checking authentication:", error);
    //   }
    // };
    // fetchAuth();
    checkAuth();
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
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
