'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from 'shared/components/atoms/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from 'shared/components/atoms/chart';

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

export default function DashboardChart({ sales }: SaleProps) {
  const groupedSales = sales.reduce(
    (acc, sale) => {
      const month = new Date(sale.createdAt).toLocaleString('default', {
        month: 'short'
      });
      acc[month] = (acc[month] || 0) + sale.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(groupedSales).map(([month, amount]) => ({
    month,
    amount
  }));

  const chartConfig = {
    amount: {
      label: 'Amount'
    }
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Monthly Revenue for {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='amount' fill=' #3b82f6' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
