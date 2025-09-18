'use client';

import React from 'react';

interface FilterPanelProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel = ({ title, children, isOpen, onToggle }: FilterPanelProps) => {
  return (
    <div className="py-6 border-b">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-2xl font-light">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};