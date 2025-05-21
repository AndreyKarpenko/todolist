import type { FC } from 'react';
import { GroceryList } from '@/components/GroceryList';
import { Header } from '@/components';

export const HomePage: FC = () => {
  return (
    <>
      <Header />
      <GroceryList />
    </>
  );
};
