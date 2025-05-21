import { type FC, useCallback, useContext, useState } from 'react';
import './GroceryItem.css';
import { Button } from '@/components/ui/button';
import type { GroceryItemDto } from '@/components/GroceryItem/types';
import { Checkbox } from '@/components/ui/checkbox';
import { GroceryContext } from '@/context/GroceryContext';
import { useNavigate } from 'react-router-dom';
import { AmountSelect } from '@/components/AmountSelect';

export const GroceryItem: FC<{ item: GroceryItemDto }> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.isBought);

  const navigate = useNavigate();
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Context Not found');
  }

  const { removeItemHandler, updateItemHandler } = context;

  const handleToggleCheckbox = useCallback(
    (value: boolean) => {
      updateItemHandler({ ...item, isBought: value }, () =>
        setIsChecked(value),
      );
    },
    [item, updateItemHandler],
  );

  const handlePressEditButton = useCallback(() => {
    navigate(`product`, { state: item });
  }, [item, navigate]);

  const handlePressRemoveButton = useCallback(() => {
    removeItemHandler(item.id);
  }, [item.id, removeItemHandler]);

  const handleChangeSelect = useCallback(
    (value: string) => {
      updateItemHandler({ ...item, amount: value });
    },
    [item, updateItemHandler],
  );

  return (
    <div className="item-container">
      <div className="item-block">
        <Checkbox checked={isChecked} onCheckedChange={handleToggleCheckbox} />
        <div className={`item-name ${isChecked ? 'item-bought' : ''}`}>
          {item.name}
        </div>
        <div className={`item-description ${isChecked ? 'item-bought' : ''}`}>
          {item.description}
        </div>
        <AmountSelect
          disabled={isChecked}
          onChangeSelect={handleChangeSelect}
          value={item.amount}
        />
      </div>

      <div className="action-block">
        <Button
          disabled={isChecked}
          onClick={handlePressEditButton}
          variant="default">
          Edit
        </Button>
        <Button
          disabled={isChecked}
          onClick={handlePressRemoveButton}
          variant="destructive">
          Remove
        </Button>
      </div>
    </div>
  );
};
