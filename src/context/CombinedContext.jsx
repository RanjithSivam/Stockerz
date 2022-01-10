import ChartDataContext from "./ChartDataContext";
import ChartPropertiesContext from "./ChartPropertiesContext";
import StockInfoContext from "./StockInfoContext";

export default function CombinedContext({ children }) {
  return (
    <ChartPropertiesContext>
      <ChartDataContext>
        <StockInfoContext>{children}</StockInfoContext>
      </ChartDataContext>
    </ChartPropertiesContext>
  );
}
