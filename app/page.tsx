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
import { X, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    <div className="bg-gray-50 text-gray-800 relative">
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />

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

<div 
  className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center bg-[url(/background.png)]"
>
  <div className="absolute inset-0 bg-black/70"></div>
  
  <div className="relative z-10 text-white p-4">
    <h2 
      className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase"
      style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
    >
      Adidas Men Running<br/>Sneakers
    </h2>
    <p 
      className="my-6 text-lg md:text-xl max-w-2xl mx-auto font-light"
      style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
    >
      Performance and design. Taken right to the edge.
    </p>
    <button className="bg-white text-black font-bold py-3 px-8  text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
      SHOP NOW
    </button>
  </div>
</div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="hidden lg:block lg:w-1/4">
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          </div>

          <div className="w-full lg:w-3/4">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-lg text-gray-500">
                <span className="font-bold text-gray-900">{filteredAndSortedProducts.length}</span> Items Found
              </p>
              <div className="flex items-center gap-4">
                <label htmlFor="sort-by" className="text-gray-500 font-medium">Sort By</label>
                <div className="relative">
                  <select 
                    id="sort-by" 
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
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
