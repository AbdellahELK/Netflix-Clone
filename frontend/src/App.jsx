import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
