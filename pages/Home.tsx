
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, SUB_CATEGORIES } from '../constants';
import { Search, ShoppingCart, Zap, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface Props {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const Home: React.FC<Props> = ({ wishlist, toggleWishlist }) => {
  const navigate = useNavigate();
  const [selectedSubCat, setSelectedSubCat] = useState('all');

  const filteredProducts = selectedSubCat === 'all' 
    ? PRODUCTS.slice(0, 4) 
    : PRODUCTS.filter(p => p.subCategory === selectedSubCat).slice(0, 4);

  return (
    <div className="px-6 pt-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-syne font-extrabold text-3xl tracking-tighter leading-tight">
            MAY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">FASHION</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Wear the future</p>
        </div>
        <div className="relative" onClick={() => navigate('/cart')}>
          <div className="w-12 h-12 rounded-2xl glass-morphism flex items-center justify-center text-indigo-400 ring-1 ring-indigo-500/30 cursor-pointer">
            <ShoppingCart size={20} />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-fuchsia-500 rounded-full border-2 border-black"></span>
        </div>
      </header>

      {/* Identity Selection */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-6">
           <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Sync Identity</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate('/shop/men')}
            className="relative h-40 rounded-[28px] overflow-hidden glass-morphism border border-indigo-500/10 group active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <span className="text-2xl font-bold leading-none">♂</span>
              </div>
              <span className="text-[10px] font-syne font-extrabold uppercase tracking-tighter text-center px-1">Men Archive</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/shop/women')}
            className="relative h-40 rounded-[28px] overflow-hidden glass-morphism border border-fuchsia-500/10 group active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-fuchsia-600/10 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-600 group-hover:text-white transition-all">
                <span className="text-2xl font-bold leading-none">♀</span>
              </div>
              <span className="text-[10px] font-syne font-extrabold uppercase tracking-tighter text-center px-1">Femme Studio</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/shop/kids')}
            className="relative h-40 rounded-[28px] overflow-hidden glass-morphism border border-yellow-500/10 group active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-yellow-600/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-600 group-hover:text-white transition-all">
                <span className="text-2xl font-bold leading-none">✧</span>
              </div>
              <span className="text-[10px] font-syne font-extrabold uppercase tracking-tighter text-center px-1">Junior Lab</span>
            </div>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-48 rounded-[40px] overflow-hidden mb-12 group cursor-pointer border border-white/5" onClick={() => navigate('/inspiration')}>
        <img 
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" 
          alt="Featured Collection"
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center space-x-2 mb-2">
            <Zap size={14} className="text-indigo-400 fill-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Season 01</span>
          </div>
          <h2 className="font-syne font-bold text-2xl uppercase leading-none tracking-tighter">HOLO-TECH<br />SUMMER 2025</h2>
        </div>
        <div className="absolute top-6 right-6">
           <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-[8px] font-bold uppercase tracking-widest text-white">Live Artifacts</span>
           </div>
        </div>
      </div>

      {/* Quick Access Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Trending Artifacts</h3>
           <button onClick={() => navigate('/shop/men')} className="text-[10px] font-bold uppercase text-indigo-400 tracking-widest">View All</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
          {SUB_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCat(cat.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-6 py-4 rounded-[24px] transition-all duration-300 border ${
                selectedSubCat === cat.id 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/20' 
                  : 'glass-morphism border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {cat.icon}
              <span className="text-xs font-bold uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Product Grid */}
      <div className="grid grid-cols-2 gap-4 pb-12">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="group cursor-pointer relative"
          >
            <div 
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-3 bg-gray-900 ring-1 ring-white/10"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4">
                <div className="px-2 py-1 glass-morphism rounded-lg">
                  <span className="text-[8px] font-bold uppercase text-indigo-300">{product.gender}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className="absolute top-4 right-4 z-10 p-2 glass-morphism rounded-xl transition-all active:scale-90"
            >
              <Heart 
                size={16} 
                className={wishlist.includes(product.id) ? "text-fuchsia-500 fill-fuchsia-500" : "text-white"} 
              />
            </button>

            <div onClick={() => navigate(`/product/${product.id}`)}>
              <h4 className="font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-1 truncate px-1">{product.name}</h4>
              <p className="font-syne font-extrabold text-base text-white px-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
