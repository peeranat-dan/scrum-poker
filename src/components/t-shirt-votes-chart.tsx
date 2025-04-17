import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

interface VotesChartProps {
  votes: {
    label: string;
    count: number;
  }[];
}

const chartConfig = {
  count: {
    label: "Vote Count",
  },
  XS: {
    label: "XS",
    color: "#3b82f6",
  },
  S: {
    label: "S",
    color: "#6395f2",
  },
  M: {
    label: "M",
    color: "#9bb3ec",
  },
  L: {
    label: "L",
    color: "#e1b7d2",
  },
  XL: {
    label: "XL",
    color: "#f46e9e",
  },
  XXL: {
    label: "XXL",
    color: "#ef1f5e",
  },
  "?": {
    label: "?",
    color: "#a3a3a3",
  },
  "🙅🏼": {
    label: "🙅🏼",
    color: "#a3a3a3",
  },
} satisfies ChartConfig;

export default function TShirtVotesChart({ votes }: Readonly<VotesChartProps>) {
  const totalVotes = votes.reduce((acc, vote) => acc + vote.count, 0);
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[250px] w-1/4"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={votes}
          dataKey="count"
          nameKey="label"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVotes}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Votes
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
