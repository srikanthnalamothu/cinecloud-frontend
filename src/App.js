import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Movies from './views/movies/Movies';
import Signup from './views/signup/Signup';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className='App'>
      <ScrollToTop />
      <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="home" index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;