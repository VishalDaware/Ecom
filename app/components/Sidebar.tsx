// app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { FilterPanel } from './FilterPanel';

interface SidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const Sidebar = ({
  selectedCategories,
  onCategoryChange,
  selectedColor,
  onColorChange
}: SidebarProps) => {
  const [openPanels, setOpenPanels] = useState({
    hotDeals: true,
    price: true,
    color: true,
    brand: true,
  });

  const togglePanel = (panel: keyof typeof openPanels) => {
    setOpenPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };
  
  // Data matching the Figma design
  const hotDeals = [
    { name: 'Nike', count: 2 },
    { name: 'Airmax', count: 48 },
    { name: 'Nike', count: 14 },
    { name: 'Adidas', count: 15 },
    { name: 'Vans', count: 23 },
  ];

  const brands = [
    { name: 'Nike', count: 99 },
    { name: 'Nike', count: 99 },
    { name: 'Adidas', count: 99 },
    { name: 'Siemens', count: 99 },
  ];

  const colors = ['#006CFF', '#FC3E39', '#171717', '#FFF600', '#FF00B4', '#EFDF00'];

  const ListItem = ({ name, count, isChecked, onChange }: { name: string, count?: number, isChecked?: boolean, onChange?: () => void }) => (
    <li className="flex justify-between items-center text-gray-600">
      <label className="flex items-center cursor-pointer">
        {isChecked !== undefined && (
          <input
            type="checkbox"
            className="mr-3 h-4 w-4 rounded text-blue-500 focus:ring-blue-500"
            checked={isChecked}
            onChange={onChange}
          />
        )}
        {name}
      </label>
      {count && <span>({count})</span>}
    </li>
  );

  return (
    <aside className="w-full lg:w-1-4">
      <FilterPanel
        title="Hot Deals"
        isOpen={openPanels.hotDeals}
        onToggle={() => togglePanel('hotDeals')}
      >
        <ul className="space-y-3">
          {hotDeals.map((deal, index) => (
            <ListItem key={index} name={deal.name} count={deal.count} />
          ))}
        </ul>
      </FilterPanel>

      <FilterPanel
        title="PRICES"
        isOpen={openPanels.price}
        onToggle={() => togglePanel('price')}
      >
        <div className="flex justify-between items-center mb-4">
          <span>Ranger:</span>
          <span className="font-semibold">$13.99 - $25.99</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="30" 
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
        />
      </FilterPanel>

      <FilterPanel
        title="COLOR"
        isOpen={openPanels.color}
        onToggle={() => togglePanel('color')}
      >
        <div className="flex gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor.toLowerCase() === color.toLowerCase()
                  ? 'border-blue-500 ring-2 ring-offset-1 ring-blue-500'
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Filter by color ${color}`}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </FilterPanel>

      <FilterPanel
        title="BRAND"
        isOpen={openPanels.brand}
        onToggle={() => togglePanel('brand')}
      >
        <ul className="space-y-3">
          {brands.map((brand, index) => (
            <ListItem 
              key={index} 
              name={brand.name} 
              count={brand.count} 
              isChecked={selectedCategories.includes(brand.name)}
              onChange={() => onCategoryChange(brand.name)}
            />
          ))}
        </ul>
        <button className="text-gray-600 font-semibold mt-3">MORE</button>
      </FilterPanel>
    </aside>
  );
};