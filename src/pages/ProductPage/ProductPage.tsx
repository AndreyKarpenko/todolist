import { type FC, useCallback, useContext, useEffect, useState } from 'react';
import { GroceryContext } from '@/context/GroceryContext';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import * as React from 'react';
import './ProductPage.css';
import { Button } from '@/components/ui/button';
import { AmountSelect } from '@/components/AmountSelect';

export const ProductPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const [item, setItem] = useState<GroceryItemDto | undefined>();
  const { items, updateItemHandler } = context;
  const [initialized, setInitialized] = useState(false); // флаг попытки инициализации

  useEffect(() => {
    if (items.length) {
      const foundItem = items.find(item => item.id === id);
      setItem(foundItem);
      setInitialized(true);
    }
  }, [id, items]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setItem(prevState =>
        prevState
          ? {
              ...prevState,
              [e.target.name]: e.target.value,
            }
          : prevState,
      );
    },
    [],
  );

  const handlePressEditButton = useCallback(() => {
    if (item) {
      updateItemHandler(item, () => navigate('/'));
    }
  }, [item, navigate, updateItemHandler]);

  const handleChangeAmount = useCallback((value: string) => {
    setItem(prevState =>
      prevState ? { ...prevState, amount: value } : prevState,
    );
  }, []);

  if (!initialized) {
    return <>Loading...</>;
  }

  if (!item) {
    return <>Not found item with id: {id}</>;
  }

  return (
    <div className="form-container">
      <Input onChange={handleChangeInput} name={'name'} value={item.name} />
      <Input
        onChange={handleChangeInput}
        name={'description'}
        value={item.description}
      />
      <AmountSelect onChangeSelect={handleChangeAmount} value={item.amount} />
      <Button onClick={handlePressEditButton} variant={'default'}>
        Update
      </Button>
    </div>
  );
};
