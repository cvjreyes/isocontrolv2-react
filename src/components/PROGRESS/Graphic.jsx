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

export default function Graphic({ data }) {
  const colors = ["brown", "red", "blue", "salmon"];

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
              payload={Object.keys(data[0])
                .filter((x) => x !== "name")
                .map((x, i) => ({
                  value: x,
                  type: "diamond",
                  id: x,
                  color: colors[i],
                }))}
            />
          )}
          {!!data[0] &&
            Object.keys(data[0]).map((x, i) => {
              return (
                <Line
                  isAnimationActive={false}
                  key={i}
                  type="monotone"
                  dataKey={x}
                  stroke={colors[i]}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
  );
}
