import './App.css';
import TimeSeriesCharts from './components/TimeSeriesCharts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Routes>
          <Route exact path="/chart/:stock" element={<TimeSeriesCharts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
