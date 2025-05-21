import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FC } from 'react';

const amounts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const AmountSelect: FC<{
  onChangeAmount: (value: string) => void;
  value?: string;
  disabled?: boolean;
}> = ({ onChangeAmount, value, disabled }) => {
  return (
    <Select disabled={disabled} onValueChange={onChangeAmount} value={value}>
      <SelectTrigger className="w-[auto]">
        <SelectValue placeholder="Choose an amount" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Amount</SelectLabel>
          {amounts.map(item => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
