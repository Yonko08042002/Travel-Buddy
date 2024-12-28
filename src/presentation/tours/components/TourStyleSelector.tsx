import type { TourStyle } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'shared/components/atoms/select';

interface TourStyleProps {
  value: string;
  onValueChange: (value: string) => void; // Changed to match single-value selection
}

export default function TourStyleSelector({
  value,
  onValueChange
}: TourStyleProps) {
  const { data: tourStyles = [] } = useQuery<TourStyle[]>({
    queryKey: ['tourStyle'],
    queryFn: async () => {
      const res = await fetch('/api/tour-style');
      if (!res.ok) throw new Error('Failed to fetch tour styles');
      return res.json();
    }
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder='Select a tour style' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tourStyles.map((tourStyle) => (
            <SelectItem key={tourStyle.id} value={tourStyle.id}>
              {tourStyle.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
