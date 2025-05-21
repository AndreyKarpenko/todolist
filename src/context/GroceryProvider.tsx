import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { GroceryContext } from './GroceryContext';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  deleteAllProduct,
  updateProduct,
} from '@/api';

export const GroceryProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const { mutate: addNewItem } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: deleteAllItems } = useMutation({
    mutationFn: deleteAllProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: updateItem } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return data;
    }
    return data.filter(element =>
      element.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [data, searchValue]);

  const onAddNew = useCallback(
    (item: Omit<GroceryItemDto, 'id' | 'isBought'>) => {
      addNewItem(item);
    },
    [addNewItem],
  );

  const removeAllHandler = useCallback(() => {
    deleteAllItems();
  }, [deleteAllItems]);

  const removeItemHandler = useCallback(
    (id: string) => {
      deleteItem(id);
    },
    [deleteItem],
  );

  const updateItemHandler = useCallback(
    (item: GroceryItemDto, onSuccess?: () => void) => {
      updateItem(item, { onSuccess });
    },
    [updateItem],
  );

  return (
    <GroceryContext.Provider
      value={{
        items: filteredItems,
        setSearchValue,
        removeAllHandler,
        onAddNew,
        removeItemHandler,
        updateItemHandler,
      }}>
      {children}
    </GroceryContext.Provider>
  );
};
