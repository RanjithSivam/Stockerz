import ChartDataContext from "./ChartDataContext";
import ChartPropertiesContext from "./ChartPropertiesContext";
import FullScreenContext from "./FullScreenContext";
import SavedStocksContext from "./SavedStocksContext";
import StockInfoContext from "./StockInfoContext";

export default function CombinedContext({ children }) {
  return (
    <SavedStocksContext>
      <ChartPropertiesContext>
        <ChartDataContext>
          <FullScreenContext>
            <StockInfoContext>{children}</StockInfoContext>
          </FullScreenContext>
        </ChartDataContext>
      </ChartPropertiesContext>
    </SavedStocksContext>
  );
}
