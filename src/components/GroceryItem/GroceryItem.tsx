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
    throw new Error('Not found');
  }

  const { removeItemHandler } = context;

  const toggleHandler = useCallback(
    (value: boolean) => {
      context.updateItemHandler({ ...item, isBought: value }, () =>
        setIsChecked(value),
      );
    },
    [context, item],
  );

  const editHandler = useCallback(() => {
    navigate(`product`, { state: item });
  }, [item, navigate]);

  const onChangeAmount = useCallback(
    (value: string) => {
      context.updateItemHandler({ ...item, amount: value });
    },
    [context, item],
  );

  return (
    <div className="item-container">
      <div className="item-block">
        <Checkbox checked={isChecked} onCheckedChange={toggleHandler} />
        <div className={`item-name ${isChecked ? 'item-bought' : ''}`}>
          {item.name}
        </div>
        <div className={`item-description ${isChecked ? 'item-bought' : ''}`}>
          {item.description}
        </div>
        <AmountSelect
          disabled={isChecked}
          onChangeAmount={onChangeAmount}
          value={item.amount}
        />
      </div>

      <div className="action-block">
        <Button disabled={isChecked} onClick={editHandler} variant="default">
          Edit
        </Button>
        <Button
          disabled={isChecked}
          onClick={() => removeItemHandler(item.id)}
          variant="destructive">
          Remove
        </Button>
      </div>
    </div>
  );
};
