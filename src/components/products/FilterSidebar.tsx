
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
  categories: string[];
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onClose,
  isMobile = false,
  categories,
  colors,
  sizes,
  minPrice,
  maxPrice,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prevSelected => {
      const newSelected = prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category];
      
      // Update the parent component with new filter values
      onFilterChange({
        categories: newSelected,
        colors: selectedColors,
        sizes: selectedSizes,
        priceRange,
      });
      
      return newSelected;
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prevSelected => {
      const newSelected = prevSelected.includes(color)
        ? prevSelected.filter(item => item !== color)
        : [...prevSelected, color];
      
      // Update the parent component with new filter values
      onFilterChange({
        categories: selectedCategories,
        colors: newSelected,
        sizes: selectedSizes,
        priceRange,
      });
      
      return newSelected;
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prevSelected => {
      const newSelected = prevSelected.includes(size)
        ? prevSelected.filter(item => item !== size)
        : [...prevSelected, size];
      
      // Update the parent component with new filter values
      onFilterChange({
        categories: selectedCategories,
        colors: newSelected,
        sizes: selectedSizes,
        priceRange,
      });
      
      return newSelected;
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    
    // Update the parent component with new filter values
    onFilterChange({
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange: newRange,
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    
    // Update the parent component with reset filter values
    onFilterChange({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [minPrice, maxPrice],
    });
  };

  return (
    <div className={`bg-white ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className="mb-6 text-xs"
      >
        Reset All
      </Button>

      <div className="space-y-6">
        {/* Categories filter */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range filter */}
        <div>
          <h3 className="font-medium mb-4">Price Range</h3>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            max={maxPrice}
            min={minPrice}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm">${priceRange[0].toFixed(2)}</p>
            <p className="text-sm">${priceRange[1].toFixed(2)}</p>
          </div>
        </div>

        <Separator />

        {/* Colors filter */}
        <div>
          <h3 className="font-medium mb-3">Colors</h3>
          <div className="space-y-2">
            {colors.map(color => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() => handleColorChange(color)}
                />
                <label
                  htmlFor={`color-${color}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sizes filter */}
        <div>
          <h3 className="font-medium mb-3">Sizes</h3>
          <div className="space-y-2">
            {sizes.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeChange(size)}
                />
                <label
                  htmlFor={`size-${size}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {isMobile && (
          <div className="mt-8">
            <Button
              className="w-full"
              onClick={onClose}
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
