
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, SUB_CATEGORIES, CATEGORY_STRUCTURE } from '../constants';
import { ArrowLeft, Search, SlidersHorizontal, Zap, Heart, ChevronRight, X } from 'lucide-react';

interface Props {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const GenderShop: React.FC<Props> = ({ wishlist, toggleWishlist }) => {
  const { gender } = useParams<{ gender: 'men' | 'women' | 'kids' }>();
  const navigate = useNavigate();
  
  // Navigation State
  const [activeSubCat, setActiveSubCat] = useState('all'); // apparel, footwear...
  const [activeType, setActiveType] = useState<string | null>(null); // Kurtis, Western Wear...
  const [activeSubType, setActiveSubType] = useState<string | null>(null); // Kurta Sets, Straight Cut...

  const getFashionableName = (g: string) => {
    switch (g) {
      case 'men': return { label: 'Archive', prefix: 'Men' };
      case 'women': return { label: 'Studio', prefix: 'Femme' };
      case 'kids': return { label: 'Lab', prefix: 'Junior' };
      default: return { label: 'Sector', prefix: 'Global' };
    }
  };

  const fashionable = getFashionableName(gender || '');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const genderMatch = p.gender === gender || p.gender === 'unisex';
      const catMatch = activeSubCat === 'all' || p.subCategory === activeSubCat;
      const typeMatch = !activeType || p.type === activeType;
      const subTypeMatch = !activeSubType || p.subType === activeSubType;
      return genderMatch && catMatch && typeMatch && subTypeMatch;
    });
  }, [gender, activeSubCat, activeType, activeSubType]);

  const currentStructure = gender ? (CATEGORY_STRUCTURE as any)[gender] : null;
  const availableTypes = activeSubCat !== 'all' && currentStructure ? currentStructure[activeSubCat] : [];
  const activeTypeObj = availableTypes.find((t: any) => t.name === activeType);
  const availableSubTypes = activeTypeObj ? activeTypeObj.subTypes : [];

  const handleSubCatChange = (id: string) => {
    setActiveSubCat(id);
    setActiveType(null);
    setActiveSubType(null);
  };

  const handleTypeChange = (name: string) => {
    setActiveType(name);
    setActiveSubType(null);
  };

  const resetFilters = () => {
    setActiveSubCat('all');
    setActiveType(null);
    setActiveSubType(null);
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-12 animate-in fade-in duration-500 pb-32">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/')} className="p-3 glass-morphism rounded-2xl text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="font-syne font-extrabold text-xl uppercase tracking-tighter">
            {fashionable.prefix} <span className="text-indigo-500">{fashionable.label}</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Protocol Active</p>
        </div>
        <button className="p-3 glass-morphism rounded-2xl text-white">
          <Search size={20} />
        </button>
      </header>

      {/* Breadcrumbs or Reset */}
      {(activeType || activeSubType) && (
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={() => { setActiveType(null); setActiveSubType(null); }}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            {activeSubCat}
          </button>
          {activeType && (
            <>
              <ChevronRight size={10} className="text-gray-700" />
              <button 
                onClick={() => setActiveSubType(null)}
                className={`text-[10px] font-bold uppercase tracking-widest ${activeSubType ? 'text-gray-500 hover:text-white' : 'text-indigo-400'}`}
              >
                {activeType}
              </button>
            </>
          )}
          {activeSubType && (
            <>
              <ChevronRight size={10} className="text-gray-700" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                {activeSubType}
              </span>
            </>
          )}
        </div>
      )}

      {/* Main Categories (Level 1) */}
      <div className="mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
          {SUB_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSubCatChange(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 p-4 rounded-3xl min-w-[80px] transition-all duration-300 border ${
                activeSubCat === cat.id 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30' 
                  : 'glass-morphism border-white/5 text-gray-400'
              }`}
            >
              <div className={`${activeSubCat === cat.id ? 'text-white' : 'text-indigo-400'}`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clothing Types (Level 2 - Kurtis, Western Wear...) */}
      {availableTypes.length > 0 && !activeType && (
        <div className="mb-6 animate-in slide-in-from-right duration-300">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 px-1">Select Module</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableTypes.map((type: any) => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.name)}
                className="p-4 rounded-[24px] glass-morphism border-white/5 text-left group hover:border-indigo-500/30 transition-all active:scale-95"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-indigo-400">{type.name}</span>
                  <ChevronRight size={14} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-[8px] text-gray-600 uppercase font-bold tracking-tighter">{type.subTypes.length} Variants Available</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sub-types (Level 3 - Kurta Sets, Straight Cut...) */}
      {availableSubTypes.length > 0 && activeType && (
        <div className="mb-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar">
            <button
              onClick={() => setActiveSubType(null)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                !activeSubType 
                  ? 'bg-white text-black border-white' 
                  : 'glass-morphism text-gray-500 border-white/5'
              }`}
            >
              All {activeType}
            </button>
            {availableSubTypes.map((sub: string) => (
              <button
                key={sub}
                onClick={() => setActiveSubType(sub)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  activeSubType === sub 
                    ? 'bg-indigo-600 text-white border-indigo-400' 
                    : 'glass-morphism text-gray-500 border-white/5'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Count & Filter Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {filteredProducts.length} Items Sync'd
        </p>
        <div className="flex space-x-3">
          {(activeType || activeSubType) && (
            <button onClick={resetFilters} className="p-2 glass-morphism rounded-xl text-red-400/80">
              <X size={14} />
            </button>
          )}
          <button className="flex items-center space-x-2 text-[10px] font-bold uppercase text-indigo-400 glass-morphism px-3 py-2 rounded-xl border-indigo-500/10">
            <SlidersHorizontal size={14} />
            <span>Matrix Sort</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center animate-in fade-in">
           <Zap size={40} className="mx-auto text-gray-800 mb-4 opacity-50" />
           <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">No artifacts matching these criteria found in the grid.</p>
           <button onClick={resetFilters} className="mt-4 text-indigo-400 font-bold text-[10px] uppercase underline underline-offset-4">Reset Neural Net</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group cursor-pointer flex flex-col h-full relative animate-in zoom-in-95 duration-300"
            >
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

              <div 
                onClick={() => navigate(`/product/${product.id}`)}
                className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-3 bg-gray-900 ring-1 ring-white/10"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                {product.type && (
                  <div className="absolute top-4 left-4">
                    <div className="px-2 py-1 glass-morphism rounded-lg border border-white/5">
                      <span className="text-[7px] font-bold uppercase text-indigo-400">{product.type}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 px-1" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest leading-tight w-[70%]">{product.name}</h4>
                  {product.subType && <span className="text-[7px] font-bold text-gray-700 bg-gray-800/30 px-1.5 py-0.5 rounded uppercase">{product.subType}</span>}
                </div>
                <p className="font-syne font-extrabold text-lg text-white">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderShop;
