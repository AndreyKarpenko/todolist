import { v4 as uuidv4 } from 'uuid';

export class ProductModel {
  constructor(initialValues) {
    this.items = initialValues;
  }

  deleteItem(id) {
    const itemToDelete = this.items.find(item => item.id === id);
    if (itemToDelete) {
      this.items = this.items.filter(item => item.id !== id);
      return itemToDelete;
    }
    return null;
  }

  deleteAllItems() {
    this.items = [];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }

  updateItem(item, id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = {
        ...this.items[index],
        ...item,
      };
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.items[index]);
        }, 500);
      });
    }
    return null;
  }

  addItem(item) {
    this.items.push({ ...item, id: uuidv4(), isBought: false });
    return item;
  }

  getAllItems() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.items);
      }, 500);
    });
  }
}

const initialValues = [
  {
    id: '1',
    name: 'Eggs',
    description: 'Fresh eggs',
    amount: '10',
    isBought: false,
  },
  {
    id: '2',
    name: 'Meat',
    description: 'Fresh beef',
    amount: '4',
    isBought: false,
  },
  {
    id: '3',
    name: 'Fish',
    description: 'Fresh salmon',
    amount: '1',
    isBought: false,
  },
  {
    id: '4',
    name: 'Bread',
    description: 'Bread from bakery',
    amount: '1',
    isBought: false,
  },
];

export default new ProductModel(initialValues);
