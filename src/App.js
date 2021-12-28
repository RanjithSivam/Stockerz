import './App.css';
import TimeSeriesCharts from './components/TimeSeriesCharts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChartPropertiesContext from './context/ChartPropertiesContext';
import SavedStocksContext from './context/SavedStocksContext';
import SavedStock from './components/SavedStock';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/chart/:stock"
            element={
              <SavedStocksContext>
                <ChartPropertiesContext>
                  <div className="flex">
                    <SavedStock />
                    <TimeSeriesCharts />
                  </div>
                </ChartPropertiesContext>
              </SavedStocksContext>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
