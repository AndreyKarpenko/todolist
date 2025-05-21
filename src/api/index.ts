import type { GroceryItemDto } from '@/components/GroceryItem/types';

const host = 'http://localhost:3001/api/products';

export const getAllProducts = async (): Promise<GroceryItemDto[]> => {
  const res = await fetch(`${host}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const createProduct = async (
  params: Omit<GroceryItemDto, 'id' | 'isBought'>,
) => {
  const res = await fetch(`${host}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: params.name,
      description: params.description,
      amount: params.amount,
    }),
  });
  if (!res.ok) throw new Error('Something went wrong');
  return res.json();
};

export const updateProduct = async (params: GroceryItemDto) => {
  const res = await fetch(`${host}/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: params.name,
      description: params.description,
      amount: params.amount,
      isBought: params.isBought,
    }),
  });
  if (!res.ok) throw new Error('Something went wrong');
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${host}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Something went wrong');
  return res.json();
};

export const deleteAllProduct = async () => {
  const res = await fetch(`${host}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Something went wrong');
  return res.json();
};
