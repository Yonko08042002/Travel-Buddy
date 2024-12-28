import { ScrollArea } from 'shared/components/atoms/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from 'shared/components/atoms/select';

export default function LocalTourSelect() {
  return (
    <Select>
      <SelectTrigger className='w-full '>
        <SelectValue placeholder='Select local' />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className='h-44  rounded-md '>
          <SelectGroup>
            <SelectLabel>Local</SelectLabel>
            <SelectItem value='DaNang'>Đà Nẵng</SelectItem>
            <SelectItem value='HCM'>Hồ Chí Minh</SelectItem>
            <SelectItem value='HaNoi'>Hà Nội</SelectItem>
            <SelectItem value='Hue'>Huế</SelectItem>
            <SelectItem value='QuangBinh'>Quảng Bình</SelectItem>
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
