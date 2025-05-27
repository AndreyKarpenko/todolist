import { type FC, useContext, useEffect, useState } from 'react';
import { GroceryContext } from '@/context/GroceryContext';
import { useParams } from 'react-router-dom';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import './ProductPage.css';

import { AddEditForm } from '@/components/AddEditForm';

export const ProductPage: FC = () => {
  const { id } = useParams();

  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const [item, setItem] = useState<GroceryItemDto | undefined>();
  const { items } = context;
  const [initialized, setInitialized] = useState(false); // флаг попытки инициализации

  useEffect(() => {
    if (items.length) {
      const foundItem = items.find(item => item.id === id);
      setItem(foundItem);
      setInitialized(true);
    }
  }, [id, items]);

  if (!initialized) {
    return <>Loading...</>;
  }

  if (!item) {
    return <>Not found item with id: {id}</>;
  }

  return (
    <div className="form-container">
      <AddEditForm editedItem={item} />
    </div>
  );
};
