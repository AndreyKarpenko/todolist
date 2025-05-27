import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { GroceryContext } from './GroceryContext';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProductApi,
  getAllProductsApi,
  deleteProductApi,
  deleteAllProductApi,
  updateProductApi,
} from '@/api';

export const GroceryProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsApi,
  });

  const { mutate: addNewItemMutation } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: deleteAllItemsMutation } = useMutation({
    mutationFn: deleteAllProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: deleteItemMutation } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: updateItemMutation } = useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onMutate: async updatedItem => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousTodos = queryClient.getQueryData(['products']);
      queryClient.setQueryData(['products'], (old: GroceryItemDto[]) => {
        return old.map(item => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        });
      });
      return { previousTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['products'], context?.previousTodos);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return data;
    }
    return data.filter(element =>
      element.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [data, searchValue]);

  const addNewItemHandler = useCallback(
    (item: Omit<GroceryItemDto, 'id' | 'isBought'>) => {
      addNewItemMutation(item);
    },
    [addNewItemMutation],
  );

  const deleteAllItemsHandler = useCallback(() => {
    deleteAllItemsMutation();
  }, [deleteAllItemsMutation]);

  const removeItemHandler = useCallback(
    (id: string) => {
      deleteItemMutation(id);
    },
    [deleteItemMutation],
  );

  const updateItemHandler = useCallback(
    (item: GroceryItemDto, onSuccess?: () => void) => {
      updateItemMutation(item, { onSuccess });
    },
    [updateItemMutation],
  );

  return (
    <GroceryContext.Provider
      value={{
        items: filteredItems,
        searchValueHandler: setSearchValue,
        deleteAllItemsHandler,
        addNewItemHandler,
        removeItemHandler,
        updateItemHandler,
      }}>
      {children}
    </GroceryContext.Provider>
  );
};
