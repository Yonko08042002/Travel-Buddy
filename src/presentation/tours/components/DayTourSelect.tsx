import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from 'shared/components/atoms/select';
export default function DayTourSelect() {
  return (
    <Select>
      <SelectTrigger className='w-full '>
        <SelectValue placeholder='All Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Day</SelectLabel>
          <SelectItem value='1_3day'>1-3 Day</SelectItem>
          <SelectItem value='4_7day'>4-7 Day</SelectItem>
          <SelectItem value='8-14day'>8-14 Day</SelectItem>
          <SelectItem value='14day'>on 14 Day</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
