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
  "0": {
    label: "0",
    color: "#3b82f6",
  },
  "1": {
    label: "1",
    color: "#4f8bf4",
  },
  "2": {
    label: "2",
    color: "#6395f2",
  },
  "3": {
    label: "3",
    color: "#77a0f0",
  },
  "5": {
    label: "5",
    color: "#9bb3ec",
  },
  "8": {
    label: "8",
    color: "#c1c7e8",
  },
  "13": {
    label: "13",
    color: "#e1b7d2",
  },
  "21": {
    label: "21",
    color: "#ed94b7",
  },
  "34": {
    label: "34",
    color: "#f46e9e",
  },
  "55": {
    label: "55",
    color: "#f3457f",
  },
  "89": {
    label: "89",
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

export default function FibonacciVotesChart({
  votes,
}: Readonly<VotesChartProps>) {
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
