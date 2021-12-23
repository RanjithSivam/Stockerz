import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { intraDay, daily, monthly, weekly } from '../api/timeSeries';
import { useParams } from 'react-router-dom';
import Search from './Search';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { ema, sma } from '../api/indicators';

function TimeSeriesCharts() {
  const [series, setSeries] = useState([]);
  const [volume, setVolume] = useState([]);
  const [candleSeries, setCandleSeries] = useState();
  const [chartSeries, setChartSeries] = useState();
  const [volumeSeries, setVolumeSeries] = useState();

  const { stock } = useParams();
  const view = useRef();

  const timeSeriesChanger = (value, interval = 5) => {
    setSeries([]);
    switch (value) {
      case 1:
        intraDay(stock, interval).then((res) => {
          setSeries(res.data);
          setVolume(res.volume);
        });
        break;
      case 2:
        daily(stock).then((res) => {
          setSeries(res.data);
          setVolume(res.volume);
        });
        break;
      case 3:
        weekly(stock).then((res) => {
          setSeries(res.data);
          setVolume(res.volume);
        });
        break;
      case 4:
        monthly(stock).then((res) => {
          setSeries(res.data);
          setVolume(res.volume);
        });
        break;
      default:
        daily(stock).then((res) => {
          setSeries(res.data);
          setVolume(res.volume);
        });
    }
    setInterval({ value: value, interval: interval });
  };

  const changeIndicator = (event) => {
    const val = event.target.value;
    const line = chartSeries.addLineSeries();
    if (parseInt(val) === 2) {
      sma(stock).then((res) => {
        line.setData([...res]);
      });
    } else if (parseInt(val) === 3) {
      ema(stock).then((res) => {
        line.setData([...res]);
      });
    } else {
    }
  };

  useEffect(() => {
    const chart = createChart(view.current, {
      width: view.current.clientWidth,
      height: view.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });
    const candle = chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });
    const vol = chart.addHistogramSeries({
      color: '#182233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0.01,
      },
    });
    setCandleSeries(candle);
    setChartSeries(chart);
    setVolumeSeries(vol);
  }, []);

  useEffect(() => {
    if (candleSeries) {
      candleSeries.setData([...series]);
      volumeSeries.setData([...volume]);
    }
  }, [series, candleSeries, volume]);

  useEffect(() => {
    timeSeriesChanger(2);
  }, [stock]);

  return (
    <div className="time_series_chart">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#253240',
        }}
      >
        <Search />
        <div className="time_series_changer">
          <button onClick={() => timeSeriesChanger(1, 1)}>1min</button>
          <button onClick={() => timeSeriesChanger(1, 5)}>5min</button>
          <button onClick={() => timeSeriesChanger(1, 15)}>15min</button>
          <button onClick={() => timeSeriesChanger(1, 30)}>30min</button>
          <button onClick={() => timeSeriesChanger(1, 60)}>60min</button>
          <button onClick={() => timeSeriesChanger(2)}>1day</button>
          <button onClick={() => timeSeriesChanger(3)}>1week</button>
          <button onClick={() => timeSeriesChanger(4)}>1month</button>
          <select name="indicator" onChange={changeIndicator} defaultValue={1}>
            <option value="1">select a indiactor</option>
            <option value="2">SMA</option>
            <option value="3">EMA</option>
          </select>
        </div>
      </div>
      <div ref={view} style={{ height: 400 }}></div>
    </div>
  );
}

export default TimeSeriesCharts;
