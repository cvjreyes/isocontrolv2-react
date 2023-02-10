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

export default function GraphicProgress({ displayData, allColors }) {
  return (
    <div className="graphic">
      <ResponsiveContainer width="90%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={displayData}
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
          {!!displayData[0] && (
            <Legend
              iconType="line"
              payload={Object.keys(displayData[0])
                .filter((x) => x !== "name")
                .map((x, i) => ({
                  value: x,
                  type: "diamond",
                  id: x,
                  color: allColors[i],
                }))}
            />
          )}
          {!!displayData[0] &&
            Object.keys(displayData[0]).map((x, i) => {
              return (
                <Line
                  isAnimationActive={false}
                  key={i}
                  type="monotone"
                  dataKey={x}
                  stroke={allColors[i]}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
