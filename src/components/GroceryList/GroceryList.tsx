import {
  type ChangeEvent,
  type FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import { GroceryItem } from '@/components';
import './GroceryList.css';
import { GroceryContext } from '@/context/GroceryContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import { AmountSelect } from '@/components/AmountSelect';

const initialValues = {
  name: '',
  description: '',
  amount: '',
};

export const GroceryList: FC = () => {
  const [newItem, setNewItem] =
    useState<Omit<GroceryItemDto, 'id' | 'isBought'>>(initialValues);
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const { items, addNewItemHandler } = context;

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handlePressEditButton = useCallback(() => {
    addNewItemHandler(newItem);
    setNewItem(initialValues);
  }, [newItem, addNewItemHandler]);

  const handleChangeSelect = useCallback((value: string) => {
    setNewItem(prevState => {
      return { ...prevState, amount: value };
    });
  }, []);

  return (
    <div className="list-container">
      <div className="add-item-form">
        <Input
          value={newItem.name}
          name={'name'}
          onChange={handleChangeInput}
          placeholder="Name"
        />
        <Input
          value={newItem.description}
          name="description"
          onChange={handleChangeInput}
          placeholder="Short description"
        />
        <AmountSelect
          onChangeSelect={handleChangeSelect}
          value={newItem.amount}
        />
        <Button
          disabled={!newItem.name || !newItem.description || !newItem.amount}
          onClick={handlePressEditButton}
          variant="default">
          Add
        </Button>
      </div>
      {items?.map(item => <GroceryItem key={item.id} item={item} />)}
    </div>
  );
};
