import React, { useContext, useRef } from 'react';
import { useEffect, useState } from 'react';
import { intraDay, daily, monthly, weekly } from '../api/timeSeries';
import { useParams } from 'react-router-dom';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { ema, sma } from '../api/indicators';
import ActionButtons from './ActionButtons';
import { PropertiesContext } from '../context/ChartPropertiesContext';
import { candle } from '../api/stock';
import Chart from './Chart';

function TimeSeriesCharts() {
  const [series, setSeries] = useState([]);
  const [volume, setVolume] = useState([]);

  const { stock } = useParams();

  const { state } = useContext(PropertiesContext);

  const changeInterval = async (symbol, resolution) => {
    const result = await candle(symbol, resolution);
    setSeries([...result.ohcl]);
    setVolume([...result.volume]);
  };

  useEffect(() => {
    changeInterval(stock, state.interval);
  }, [stock]);

  return (
    <div className="time_series_chart flex-1">
      <ActionButtons changeInterval={changeInterval} />
      <Chart series={series} volume={volume} />
    </div>
  );
}

// changeIndicator={changeIndicator}

export default TimeSeriesCharts;
