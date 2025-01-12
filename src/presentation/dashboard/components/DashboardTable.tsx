import { ScrollArea } from 'shared/components/atoms/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from 'shared/components/atoms/table';

interface ListSale {
  id: string;
  stripePurchaseId: string;
  amount: number;
  userId: string;
  tourId: string;
  createdAt: Date;
  title: string | undefined;
  avatar: string | null | undefined;
  email: string | undefined;
  price: number;
}

type SaleProps = {
  sales: ListSale[];
};

export default function DashboardTable({ sales }: SaleProps) {
  const totalAmount = sales.reduce(
    (acc, sale) => acc + sale.amount * sale.price,
    0
  );

  return (
    <>
      <ScrollArea className='h-[calc(80vh-240px)] '>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-semibold'>Email user</TableHead>
              <TableHead className='font-semibold'>Title Tour</TableHead>
              <TableHead className='font-semibold'>Date</TableHead>
              <TableHead className='font-semibold'>Price</TableHead>
              <TableHead className='font-semibold text-center'>
                Amount
              </TableHead>
              <TableHead className='font-semibold text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sales.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.email}</TableCell>
                <TableCell>{item.title || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.price.toLocaleString('vi-VN')} VND</TableCell>
                <TableCell className='text-center'>{item.amount}</TableCell>
                <TableCell className='text-right'>
                  {(item.amount * item.price).toLocaleString('vi-VN')} VND
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell className='text-primary' colSpan={3}>
              Total
            </TableCell>
            <TableCell className='text-right'>
              {totalAmount.toLocaleString('vi-VN')} VND
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
