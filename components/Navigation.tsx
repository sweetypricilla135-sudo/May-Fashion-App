
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, HelpCircle, User, ShoppingBag, Heart } from 'lucide-react';

interface Props {
  cartCount: number;
}

const Navigation: React.FC<Props> = ({ cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ icon: Icon, path, label, badge }: { icon: any, path: string, label: string, badge?: number }) => (
    <button
      onClick={() => navigate(path)}
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
        isActive(path) ? 'text-indigo-500 scale-110' : 'text-gray-500'
      }`}
    >
      <div className="relative">
        <Icon size={24} strokeWidth={isActive(path) ? 2.5 : 2} />
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-black">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 left-4 right-4 h-16 glass-morphism rounded-3xl z-50 flex items-center justify-around px-2 shadow-2xl">
      <NavItem icon={Home} path="/" label="Shop" />
      <NavItem icon={Sparkles} path="/inspiration" label="Trends" />
      <NavItem icon={ShoppingBag} path="/cart" label="Cart" badge={cartCount} />
      <NavItem icon={Heart} path="/wishlist" label="Wish" />
      <NavItem icon={User} path="/help" label="Help" />
    </div>
  );
};

export default Navigation;
