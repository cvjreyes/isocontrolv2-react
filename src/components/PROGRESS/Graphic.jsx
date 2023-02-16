import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Graphic({ data, colors, subcategories }) {
  return (
    <ResponsiveContainer className="graphic" width="95%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip isAnimationActive={false} offset={10000000} />
        {!!data[0] && (
          <Legend
            iconType="line"
            payload={subcategories.map((x, i) => {
                return {
                  value: x.key,
                  type: "diamond",
                  id: x.key,
                  color: colors[i],
                };
              })}
          />
        )}
        {!!data[0] &&
          Object.keys(data[0])
            .filter((x) => x !== "name")
            .map((x, i) => {
              const idx = subcategories.findIndex((y) => y.key === x)
              return (
                <Line
                  isAnimationActive={false}
                  key={i}
                  type="monotone"
                  dataKey={x}
                  stroke={colors[idx]}
                />
              );
            })}
      </LineChart>
    </ResponsiveContainer>
  );
}
