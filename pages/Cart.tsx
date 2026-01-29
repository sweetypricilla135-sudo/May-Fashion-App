
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  removeFromCart: (id: string, size: string, color: string) => void;
}

const Cart: React.FC<Props> = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="px-8 pt-12 pb-10 min-h-screen flex flex-col">
      <div className="flex items-center space-x-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-3 glass-morphism rounded-2xl text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-syne font-bold text-2xl uppercase tracking-tighter">Inventory Matrix</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-gray-700">
            <ShoppingBag size={48} />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-xl uppercase tracking-tighter">Empty Sector</p>
            <p className="text-sm text-gray-500 max-w-[200px]">Your fashion-tech collection is currently offline.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-indigo-600 rounded-full font-bold uppercase tracking-widest text-xs"
          >
            Deploy Shop
          </button>
        </div>
      ) : (
        <div className="flex-1 space-y-8">
          <div className="space-y-6">
            {cart.map((item, idx) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                className="flex items-center space-x-5 animate-in slide-in-from-left duration-300" 
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-900 ring-1 ring-white/10 flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-1 right-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm" 
                      style={{ backgroundColor: item.selectedColor }}
                      title={item.selectedColor}
                    ></div>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm uppercase tracking-tight truncate w-32 text-white">{item.name}</h3>
                  <div className="flex space-x-2">
                    <span className="text-[9px] px-2 py-0.5 glass-morphism rounded-md text-gray-300 font-bold border border-white/5">{item.selectedSize}</span>
                    <span className="text-[9px] px-2 py-0.5 glass-morphism rounded-md text-indigo-400 font-bold uppercase border border-indigo-500/10">Qty: {item.quantity}</span>
                  </div>
                  <p className="font-syne font-bold text-sm text-indigo-400">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                  className="p-3 text-gray-600 hover:text-red-500 transition-colors active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                <span className="font-syne font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Quantum Shipping</span>
                <span className="font-syne font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-white uppercase tracking-widest font-bold text-xs">Final Transmit</span>
                <span className="font-syne font-bold text-2xl text-indigo-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-bold text-lg uppercase tracking-widest shadow-2xl shadow-indigo-600/30 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all">
              <CreditCard size={20} />
              <span>Initiate Protocol</span>
            </button>
            
            <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">Secure Encryption Active • Verified by May-Core</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
