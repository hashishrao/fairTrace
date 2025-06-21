'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const visibilityData = [
  { group: 'Top 10% Posts', Current: 45, Proposed: 60 },
  { group: 'Other 90% Posts', Current: 55, Proposed: 40 },
];

const reachData = [
  { group: 'New Users', Current: 25, Proposed: 40 },
  { group: 'Established Users', Current: 75, Proposed: 60 },
];

const biasData = [
  { factor: 'Early Likes', Current: 70, Proposed: 40 },
  { factor: 'Sustained Engagement', Current: 30, Proposed: 60 },
];

const chartConfig = {
  Current: {
    label: 'Current',
    color: 'hsl(var(--chart-1))',
  },
  Proposed: {
    label: 'Proposed',
    color: 'hsl(var(--chart-2))',
  },
};

export function ProposalImpactCharts() {
  return (
    <div className="mt-8 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Predicted Impact on Visibility</CardTitle>
                <CardDescription>Top 10% posts gain more visibility.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart accessibilityLayer data={visibilityData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="group"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                         <YAxis
                            tickFormatter={(value) => `${value}%`}
                            domain={[0, 100]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="Current" fill="var(--color-Current)" radius={4} />
                        <Bar dataKey="Proposed" fill="var(--color-Proposed)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Predicted Reach for User Groups</CardTitle>
                <CardDescription>New users’ posts get 15% more average reach.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart accessibilityLayer data={reachData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="group"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickFormatter={(value) => `${value}%`}
                            domain={[0, 100]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="Current" fill="var(--color-Current)" radius={4} />
                        <Bar dataKey="Proposed" fill="var(--color-Proposed)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Bias Reduction Analysis</CardTitle>
                <CardDescription>Reduced bias towards early likes.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={biasData} layout="vertical">
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="factor"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={150}
                        />
                        <XAxis
                            type="number"
                            hide={true}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="Current" fill="var(--color-Current)" radius={4} />
                        <Bar dataKey="Proposed" fill="var(--color-Proposed)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
