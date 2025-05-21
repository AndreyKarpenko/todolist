import { type FC, useCallback, useContext, useState } from 'react';
import { GroceryContext } from '@/context/GroceryContext';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import * as React from 'react';
import './ProductPage.css';
import { Button } from '@/components/ui/button';
import { AmountSelect } from '@/components/AmountSelect';

export const ProductPage: FC = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [item, setItem] = useState<GroceryItemDto>(state);

  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const { updateItemHandler } = context;

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setItem(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const handlePressEditButton = useCallback(() => {
    updateItemHandler(item, () => navigate('/'));
  }, [item, navigate, updateItemHandler]);

  const handleChangeAmount = useCallback((value: string) => {
    setItem(prevState => {
      return { ...prevState, amount: value };
    });
  }, []);

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
