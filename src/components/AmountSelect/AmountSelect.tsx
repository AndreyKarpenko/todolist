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
  defaultValue?: string;
  disabled?: boolean;
}> = ({ onChangeAmount, defaultValue, disabled }) => {
  return (
    <Select
      disabled={disabled}
      onValueChange={onChangeAmount}
      defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
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
