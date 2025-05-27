import { Input } from '@/components/ui/input';
import { AmountSelect } from '@/components/AmountSelect';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { type FC, useCallback, useContext, useState } from 'react';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import { useNavigate } from 'react-router-dom';
import { GroceryContext } from '@/context/GroceryContext';

const initialValues = {
  name: '',
  description: '',
  amount: '',
};

export const AddEditForm: FC<{ editedItem?: GroceryItemDto }> = ({
  editedItem,
}) => {
  const [item, setItem] = useState<Omit<GroceryItemDto, 'id' | 'isBought'>>(
    editedItem || initialValues,
  );

  const navigate = useNavigate();
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const { updateItemHandler, addNewItemHandler } = context;

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

  const handlePressButton = useCallback(() => {
    if (editedItem) {
      updateItemHandler({ ...editedItem, ...item }, () => navigate('/'));
    } else {
      addNewItemHandler(item, () => setItem(initialValues));
    }
  }, [editedItem, updateItemHandler, item, navigate, addNewItemHandler]);

  const handleChangeAmount = useCallback((value: string) => {
    setItem(prevState =>
      prevState ? { ...prevState, amount: value } : prevState,
    );
  }, []);

  return (
    <>
      <Input onChange={handleChangeInput} name={'name'} value={item?.name} />
      <Input
        onChange={handleChangeInput}
        name={'description'}
        value={item?.description}
      />
      <AmountSelect onChangeSelect={handleChangeAmount} value={item?.amount} />
      <Button onClick={handlePressButton} variant={'default'}>
        {editedItem ? 'Update' : 'Create'}
      </Button>
    </>
  );
};
