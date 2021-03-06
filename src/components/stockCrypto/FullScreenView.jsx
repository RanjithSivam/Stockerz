import { useContext } from "react";
import { PropertiesContext } from "../../context/ChartPropertiesContext";
import Chart from "./chart";

function FullScreenView() {
  const { state } = useContext(PropertiesContext);
  if (state.fullscreen) {
    return (
      <div
        className="absolute z-20 w-screen h-screen p-2 flex items-center justify-center inset-0	"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="w-2/3">
          <Chart fullscreen={state.fullscreen} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default FullScreenView;
