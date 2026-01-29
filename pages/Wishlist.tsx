
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface Props {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const Wishlist: React.FC<Props> = ({ wishlist, toggleWishlist }) => {
  const navigate = useNavigate();
  const wishlistItems = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="px-8 pt-12 pb-10 min-h-screen flex flex-col">
      <div className="flex items-center space-x-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-3 glass-morphism rounded-2xl text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-syne font-bold text-2xl uppercase tracking-tighter">Wishlist Core</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-gray-700">
            <Heart size={48} />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-xl uppercase tracking-tighter">Zero Desires</p>
            <p className="text-sm text-gray-500 max-w-[200px]">Save your favorite artifacts here for future acquisition.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-indigo-600 rounded-full font-bold uppercase tracking-widest text-xs"
          >
            Scan Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-32">
          {wishlistItems.map(product => (
            <div 
              key={product.id} 
              className="group cursor-pointer flex flex-col h-full relative"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-4 right-4 z-10 p-2 glass-morphism rounded-xl transition-all active:scale-90"
              >
                <Trash2 size={16} className="text-red-400" />
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
              </div>
              <div className="flex-1 px-1" onClick={() => navigate(`/product/${product.id}`)}>
                <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest mb-1 leading-tight">{product.name}</h4>
                <p className="font-syne font-extrabold text-lg text-white">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
