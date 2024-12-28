import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from 'shared/components/atoms/select';

export default function TourTypeSelect() {
  return (
    <Select>
      <SelectTrigger className='w-full '>
        <SelectValue placeholder='Type Hotel' />
      </SelectTrigger>
      <SelectContent className='  rounded-md '>
        <SelectGroup>
          <SelectLabel>Type Hotel</SelectLabel>
          <SelectItem value='Standard'>Standard</SelectItem>
          <SelectItem value='Deluxe'>Deluxe</SelectItem>
          <SelectItem value='Luxury'>Luxury</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
