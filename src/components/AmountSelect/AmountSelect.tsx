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
import { amountValues } from '@/components/AmountSelect/constants';
import type { AmountSelectProps } from '@/components/AmountSelect/types';

export const AmountSelect: FC<AmountSelectProps> = ({
  onChangeSelect,
  value,
  disabled,
}) => {
  return (
    <Select disabled={disabled} onValueChange={onChangeSelect} value={value}>
      <SelectTrigger className="w-[auto]">
        <SelectValue placeholder="Choose an amount" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Amount</SelectLabel>
          {amountValues.map(item => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
