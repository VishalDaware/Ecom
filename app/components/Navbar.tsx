
'use client';

import { Search, ShoppingBag, User, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-gray-200/70">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="lg:hidden text-gray-700">
              <Menu size={24} />
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">E-Comm</h1>
          </div>
          <nav className="hidden lg:flex gap-10 font-semibold text-gray-700">
            <a href="#" className="relative group">
              <span>HOME</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group">
              <span>BAGS</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group">
              <span>SNEAKERS</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group">
              <span>BELT</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group">
              <span>CONTACT</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <div className="flex items-center gap-3 text-gray-600">
            <button className="p-2 rounded-full hover:bg-gray-200/70 transition-colors">
              <Search size={22} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200/70 transition-colors">
              <User size={22} />
            </button>
            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200/70 transition-colors">
              <ShoppingBag size={22} />
              <span className="text-sm font-bold">$0.00</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

