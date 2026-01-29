
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import HelpDesk from './pages/HelpDesk';
import Cart from './pages/Cart';
import Inspiration from './pages/Inspiration';
import GenderShop from './pages/GenderShop';
import Wishlist from './pages/Wishlist';
import Navigation from './components/Navigation';
import { CartItem, Product } from './types';

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load wishlist and cart from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('may_fashion_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }

    const savedCart = localStorage.getItem('may_fashion_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Sync wishlist to local storage
  useEffect(() => {
    localStorage.setItem('may_fashion_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('may_fashion_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Logic updated to check both size AND color for uniqueness
      const existing = prev.find(i => 
        i.id === item.id && 
        i.selectedSize === item.selectedSize && 
        i.selectedColor === item.selectedColor
      );
      
      if (existing) {
        return prev.map(i => 
          i.id === item.id && 
          i.selectedSize === item.selectedSize && 
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart(prev => prev.filter(i => 
      !(i.id === id && i.selectedSize === size && i.selectedColor === color)
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black relative flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-600 opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-fuchsia-600 opacity-20 blur-[100px] rounded-full"></div>
      </div>

      <main className="flex-1 pb-24 z-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/help" element={<HelpDesk />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/shop/:gender" element={<GenderShop wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/profile" element={<div className="p-8"><h1 className="text-2xl font-syne font-bold uppercase">User Profile</h1><p className="mt-4 text-gray-500">Feature coming soon.</p></div>} />
        </Routes>
      </main>

      <Navigation cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
