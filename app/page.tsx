// app/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { Pagination } from './components/Pagination';
import { mockProducts } from './data/mockProducts';
import { Product } from './types';
import { X } from 'lucide-react'; // Import the close icon for the drawer

export default function HomePage() {
  // --- Master Product List ---
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // --- Filter States ---
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');

  // --- Sorting State ---
  const [sortOption, setSortOption] = useState('name-asc');

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // --- Drawer State ---
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --- Derived State (Calculated from other states) ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedColor) {
      result = result.filter(p => p.colors.map(c => c.toLowerCase()).includes(selectedColor.toLowerCase()));
    }
    result.sort((a, b) => {
      const priceA = a.discountPrice ?? a.price;
      const priceB = b.discountPrice ?? b.price;
      switch (sortOption) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'name-asc': default: return a.name.localeCompare(b.name);
      }
    });
    return result;
  }, [products, selectedCategories, selectedColor, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedColor, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(prev => (prev === color ? '' : color));
  };
  
  return (
    <div className="bg-white text-gray-800 relative">
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />

      {/* --- Mobile Drawer and Overlay --- */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 p-6 overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1">
                <X size={24} />
              </button>
            </div>
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          </div>
        </>
      )}

      {/* Hero Banner Section */}
      <div className="bg-blue-500 text-white">
        <div className="container mx-auto px-4 py-8 md:py-16 flex items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Adidas Men Running Sneakers</h2>
            <p className="my-4 text-lg">Performance and design. Taken right to the edge.</p>
            <button className="font-bold border-2 border-white py-2 px-6 hover:bg-white hover:text-blue-500 transition-colors duration-300">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center p-4 border rounded-md">
              <p className="text-gray-600 mb-2 sm:mb-0">{filteredAndSortedProducts.length} Items Found</p>
              <div className="flex items-center gap-4">
                <label htmlFor="sort-by" className="text-gray-600">Sort By</label>
                <select 
                  id="sort-by" 
                  className="border rounded-md p-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}