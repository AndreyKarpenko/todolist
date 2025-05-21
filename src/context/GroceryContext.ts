import { createContext } from 'react';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
type GroceryContextType = {
  items: GroceryItemDto[];
  setSearchValue: (value: string) => void;
  removeAllHandler: () => void;
  onAddNew: (item: Omit<GroceryItemDto, 'id' | 'isBought'>) => void;
  removeItemHandler: (id: string) => void;
  updateItemHandler: (item: GroceryItemDto, onSuccess?: () => void) => void;
};
export const GroceryContext = createContext<GroceryContextType | null>(null);
