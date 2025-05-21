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

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setItem(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const editProductHandler = useCallback(() => {
    updateItemHandler(item, () => navigate('/'));
  }, [item, navigate, updateItemHandler]);

  const onChangeAmount = useCallback((value: string) => {
    setItem(prevState => {
      return { ...prevState, amount: value };
    });
  }, []);

  return (
    <div className="form-container">
      <Input onChange={changeHandler} name={'name'} value={item.name} />
      <Input
        onChange={changeHandler}
        name={'description'}
        value={item.description}
      />
      <AmountSelect
        onChangeAmount={onChangeAmount}
        defaultValue={item.amount}
      />
      <Button onClick={editProductHandler} variant={'default'}>
        Update
      </Button>
    </div>
  );
};
