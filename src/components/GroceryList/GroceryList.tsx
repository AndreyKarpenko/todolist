import { type FC, useContext } from 'react';
import { GroceryItem } from '@/components';
import './GroceryList.css';
import { GroceryContext } from '@/context/GroceryContext';

import { AddEditForm } from '@/components/AddEditForm';

export const GroceryList: FC = () => {
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const { items } = context;

  return (
    <div className="list-container">
      <div className="add-item-form">
        <AddEditForm />
      </div>
      {items?.map(item => <GroceryItem key={item.id} item={item} />)}
    </div>
  );
};
