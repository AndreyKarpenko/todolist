import { type FC, useContext } from 'react';
import './Header.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GroceryContext } from '@/context/GroceryContext';

export const Header: FC = () => {
  const context = useContext(GroceryContext);

  if (!context) {
    throw new Error('Not found');
  }

  return (
    <div className="header-container">
      <Input
        onChange={e => context?.setSearchValue(e.target.value)}
        className="search-input"
        placeholder={'Find'}
      />
      <section>
        <Button onClick={context?.removeAllHandler} variant={'destructive'}>
          Remove All
        </Button>
      </section>
    </div>
  );
};
