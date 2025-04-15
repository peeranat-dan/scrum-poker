import { ChartContainer, type ChartConfig } from "./ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

interface VotesChartProps {
  votes: {
    count: number;
    label: string;
  }[];
}

const chartConfig = {
  count: {
    label: "Vote Count",
    color: "#9333ea",
  },
} satisfies ChartConfig;

export default function VotesChart({ votes }: Readonly<VotesChartProps>) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[200px] w-1/4">
      <BarChart accessibilityLayer data={votes}>
        <Bar dataKey="count" fill="var(--color-count)" radius={8} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
      </BarChart>
    </ChartContainer>
  );
}
