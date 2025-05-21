import { type FC, useCallback, useContext } from 'react';
import './Header.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GroceryContext } from '@/context/GroceryContext';
import * as React from 'react';

export const Header: FC = () => {
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  const { searchValueHandler, deleteAllItemsHandler } = context;

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchValueHandler(e.target.value);
    },
    [searchValueHandler],
  );

  return (
    <div className="header-container">
      <Input
        onChange={handleChangeInput}
        className="search-input"
        placeholder={'Find'}
      />
      <section>
        <Button onClick={deleteAllItemsHandler} variant={'destructive'}>
          Remove All
        </Button>
      </section>
    </div>
  );
};
