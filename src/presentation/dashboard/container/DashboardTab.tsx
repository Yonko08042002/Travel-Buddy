import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'shared/components/atoms/tabs';
import DashboardTable from '../components/DashboardTable';
import DashboardChart from '../components/DashboardChart';

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

export default function DashboardTab({ sales }: SaleProps) {
  return (
    <Tabs defaultValue='table' className='w-full'>
      <TabsList className='w-max grid grid-cols-2'>
        <TabsTrigger value='table'>Table</TabsTrigger>
        <TabsTrigger value='chart'>Chart</TabsTrigger>
      </TabsList>
      <TabsContent value='table'>
        <DashboardTable sales={sales} />
      </TabsContent>
      <TabsContent value='chart'>
        <DashboardChart sales={sales} />
      </TabsContent>
    </Tabs>
  );
}
