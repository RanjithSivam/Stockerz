import ChartAction from "./ChartAction";
import Chart from "./Chart";

export default ({ fullscreen }) => {
  return (
    <div className="flex-1 w-full">
      <ChartAction fullscreen={fullscreen} />
      <Chart fullscreen={fullscreen} />
    </div>
  );
};
