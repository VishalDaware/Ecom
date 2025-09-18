// app/components/ProductCard.tsx

import Image from 'next/image';
import { Product } from '../types';
import { Badge } from './Badge';
import { Rating } from './Rating';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      
      <div className="relative w-full h-52 overflow-hidden"> {/* Reduced image height */}
        
        {/* "HOT" Badge - Positioned exactly in the corner */}
        {product.isHot && (
          <div className="absolute top-0 left-0 z-10">
            <Badge text="HOT" />
          </div>
        )}

        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button className="p-3 bg-white rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-3 bg-white rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Increased padding and spacing for a larger, more fulfilled content area */}
      <div className="p-6 text-left flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-gray-800 mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        
        <div className="mb-4">
          <Rating value={product.ratingValue} />
        </div>

        {/* Pushed to the bottom */}
        <div className="mt-auto flex items-baseline gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-extrabold text-black">${product.discountPrice.toFixed(2)}</span>
              <span className="text-md font-semibold text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-2xl font-extrabold text-black">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};