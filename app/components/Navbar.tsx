// app/components/Navbar.tsx
'use client';

import { Search, ShoppingBag, User, Menu } from 'lucide-react';

// Define the props the component will accept
interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info and login */}
        <div className="flex justify-between items-center py-2 text-sm text-gray-600">
          <div>
            <span>EN</span>
            <span className="ml-2">USD</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-1">
              <User size={16} /> Profile
            </a>
            <a href="#" className="flex items-center gap-1">
              <ShoppingBag size={16} /> Items
            </a>
            <span className="text-gray-400">$0.00</span>
            <Search size={16} className="cursor-pointer" />
          </div>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          
          {/* Hamburger Menu Icon: Visible only on small screens (lg:hidden) */}
          <button onClick={onMenuClick} className="lg:hidden p-2">
            <Menu size={24} />
          </button>

          <h1 className="text-2xl font-bold text-blue-600">E-Comm</h1>
          
          {/* Main Navigation: Hidden on small screens (hidden), visible on large (lg:flex) */}
          <nav className="hidden lg:flex gap-6 font-semibold text-gray-800">
            <a href="#" className="hover:text-blue-500">HOME</a>
            <a href="#" className="hover:text-blue-500">BAGS</a>
            <a href="#" className="hover:text-blue-500">SNEAKERS</a>
            <a href="#" className="hover:text-blue-500">BELT</a>
            <a href="#" className="hover:text-blue-500">CONTACT</a>
          </nav>

          {/* Spacer to balance the layout on large screens when the menu icon is hidden */}
          <div className="hidden lg:block w-8"></div>

        </div>
      </div>
    </header>
  );
};