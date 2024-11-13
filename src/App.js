import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './views/home/';
import Login from './views/login/';
import Movies from './views/movies/';
import Signup from './views/signup/';
import Header from './components/header';
import Favorites from './views/favorites';
import Cart from './views/cart';
import Movie from './views/movie';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;