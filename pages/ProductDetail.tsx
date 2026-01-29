
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { CartItem } from '../types';
import { ArrowLeft, Box, Sparkles, ShoppingBag, Eye, Heart, Check, RotateCcw } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';
import ThreeDViewer from '../components/ThreeDViewer';
import VRTryOn from '../components/VRTryOn';

interface Props {
  addToCart: (item: CartItem) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const ProductDetail: React.FC<Props> = ({ addToCart, wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [showVR, setShowVR] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      fetchAdvice();
    }
  }, [product]);

  const fetchAdvice = async () => {
    if (!product) return;
    setLoadingAdvice(true);
    const advice = await getStylingAdvice(product.name, product.description);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  if (!product) return <div>Product not found</div>;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    });
    
    // Simulate high-tech sync
    setTimeout(() => {
      setIsAdding(false);
      navigate('/cart');
    }, 600);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="animate-in slide-in-from-bottom duration-500">
      {showVR && <VRTryOn productImage={product.image} onClose={() => setShowVR(false)} />}

      {/* Top Bar */}
      <div className="absolute top-12 left-6 right-6 z-20 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-3 glass-morphism rounded-2xl text-white">
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={() => toggleWishlist(product.id)}
          className="p-3 glass-morphism rounded-2xl text-white transition-all active:scale-90"
        >
          <Heart size={20} className={isWishlisted ? "text-fuchsia-500 fill-fuchsia-500" : ""} />
        </button>
      </div>

      {/* Media Viewer */}
      <div className="relative w-full h-[450px] mb-8 overflow-hidden rounded-b-[48px] bg-gray-900 border-b border-white/10">
        {viewMode === '2D' ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover animate-in fade-in duration-700" />
        ) : (
          <ThreeDViewer modelType={product.threeDModel} color={selectedColor} />
        )}
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          <button 
            onClick={() => setViewMode('2D')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              viewMode === '2D' ? 'bg-white text-black' : 'glass-morphism text-white'
            }`}
          >
            2D Vision
          </button>
          <button 
            onClick={() => setViewMode('3D')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              viewMode === '3D' ? 'bg-white text-black' : 'glass-morphism text-white'
            }`}
          >
            3D Artifact
          </button>
        </div>

        <button 
          onClick={() => setShowVR(true)}
          className="absolute right-6 bottom-10 p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/40 animate-bounce active:scale-95 transition-transform"
        >
          <Eye size={24} className="text-white" />
        </button>
      </div>

      {/* Product Content */}
      <div className="px-8 pb-10 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">{product.category}</p>
            <h1 className="font-syne font-bold text-2xl uppercase leading-none tracking-tighter">{product.name}</h1>
          </div>
          <p className="font-syne font-bold text-2xl text-white">${product.price.toFixed(2)}</p>
        </div>

        {/* Variations Section */}
        <div className="space-y-6 glass-morphism p-6 rounded-[32px] border border-white/5">
          {/* Colors */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Flux Channel</p>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{selectedColor}</span>
            </div>
            <div className="flex space-x-4">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color ? 'border-white scale-110 shadow-lg shadow-white/10' : 'border-transparent opacity-60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>
                  {selectedColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Check size={14} className={color.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white' ? 'text-black' : 'text-white'} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Dimension Matrix</p>
               <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300">Size Guide</button>
            </div>
            <div className="flex gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                    selectedSize === size 
                      ? 'bg-white text-black border-white shadow-lg' 
                      : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Bio</p>
           <p className="text-sm text-gray-400 leading-relaxed font-light">{product.description}</p>
        </div>

        {/* AI Styling Tips */}
        <div className="p-6 glass-morphism rounded-[32px] border border-fuchsia-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles size={40} className="text-fuchsia-400" />
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles size={18} className="text-fuchsia-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">AI Stylist Insights</span>
          </div>
          {loadingAdvice ? (
            <div className="space-y-2 animate-pulse">
               <div className="h-3 bg-gray-800 rounded w-full"></div>
               <div className="h-3 bg-gray-800 rounded w-2/3"></div>
            </div>
          ) : (
            <p className="text-sm text-gray-300 font-medium italic leading-relaxed relative z-10">
              "{aiAdvice}"
            </p>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-6 rounded-[24px] font-bold text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center space-x-3 active:scale-[0.98] ${
            isAdding ? 'bg-indigo-600 text-white animate-pulse' : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {isAdding ? (
             <>
               <Box className="animate-spin" size={20} />
               <span>Syncing...</span>
             </>
          ) : (
            <>
              <ShoppingBag size={20} />
              <span>Sync to Inventory</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
