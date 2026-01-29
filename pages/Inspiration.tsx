
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LOOKBOOKS, PRODUCTS } from '../constants';
import { ArrowRight, Play, X, Sparkles, ShoppingBag } from 'lucide-react';
import { StyleLook } from '../types';

// Define props for LookCard to resolve TypeScript assignment errors
interface LookCardProps {
  look: StyleLook;
  onClick: () => void;
}

// Fix: Use React.FC to allow for standard React props like 'key' in JSX
const LookCard: React.FC<LookCardProps> = ({ look, onClick }) => (
  <div 
    onClick={onClick}
    className="relative group h-[400px] w-full rounded-[40px] overflow-hidden cursor-pointer mb-6 ring-1 ring-white/10"
  >
    <img 
      src={look.image} 
      alt={look.title}
      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    
    <div className="absolute bottom-8 left-8 right-8">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles size={14} className="text-fuchsia-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400">Curated Vibe</span>
      </div>
      <h3 className="font-syne font-extrabold text-3xl uppercase tracking-tighter leading-none mb-1">{look.title}</h3>
      <p className="text-xs text-gray-300 font-medium uppercase tracking-widest opacity-80">{look.subtitle}</p>
    </div>

    <div className="absolute top-8 right-8">
      <div className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
        <Play size={20} className="fill-current" />
      </div>
    </div>
  </div>
);

const Inspiration: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<StyleLook | null>(null);

  return (
    <div className="px-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="mb-10 text-center">
        <h1 className="font-syne font-extrabold text-4xl tracking-tighter uppercase">
          STYLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">CORE</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mt-2">Visual Inspirations for the Next Gen</p>
      </header>

      <div className="space-y-4">
        {LOOKBOOKS.map(look => (
          <LookCard key={look.id} look={look} onClick={() => setSelectedLook(look)} />
        ))}
      </div>

      {/* Lookbook Detail Overlay */}
      {selectedLook && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
          <div className="px-8 pt-12 pb-24 max-w-md mx-auto min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">Lookbook Detail</span>
              </div>
              <button 
                onClick={() => setSelectedLook(null)} 
                className="p-3 glass-morphism rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Close Lookbook"
              >
                <X size={24} />
              </button>
            </div>

            <div className="w-full aspect-[4/5] rounded-[48px] overflow-hidden mb-10 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/10">
              <img src={selectedLook.image} alt={selectedLook.title} className="w-full h-full object-cover" />
            </div>

            <h2 className="font-syne font-extrabold text-5xl uppercase tracking-tighter leading-none mb-6">
              {selectedLook.title}
            </h2>

            <div className="space-y-4 mb-12">
               <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                 <span className="w-4 h-[1px] bg-indigo-400"></span>
                 Vibe Manifesto
               </p>
               <p className="text-gray-400 leading-relaxed italic text-lg">
                 "{selectedLook.description}"
               </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Shop the look</p>
                 <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{selectedLook.productIds.length} ARTIFACTS</span>
               </div>
               
               <div className="space-y-4">
                  {selectedLook.productIds.map(pid => {
                    const p = PRODUCTS.find(prod => prod.id === pid);
                    if (!p) return null;
                    return (
                      <Link 
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="flex items-center justify-between p-4 glass-morphism rounded-3xl cursor-pointer hover:bg-white/5 transition-all group no-underline text-white border border-transparent hover:border-indigo-500/30"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-white/10">
                            <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                            <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">In Stock</p>
                            <p className="text-sm font-bold uppercase tracking-tight mb-1 group-hover:text-indigo-300 transition-colors">{p.name}</p>
                            <p className="text-sm font-syne font-bold text-white">${p.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="p-3 bg-white/5 rounded-full group-hover:bg-indigo-600 group-hover:translate-x-1 transition-all">
                            <ArrowRight size={18} className="text-white" />
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-indigo-400 transition-colors">View</span>
                        </div>
                      </Link>
                    );
                  })}
               </div>
            </div>

            <button 
              onClick={() => setSelectedLook(null)}
              className="mt-16 w-full py-6 glass-morphism border border-indigo-500/20 rounded-[24px] font-bold text-sm uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              <span>Explore More Dimensions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspiration;
