import { createChart, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

function Chart({ series, volume }) {
  const [candleSeries, setCandleSeries] = useState();
  const [chartSeries, setChartSeries] = useState();
  const [volumeSeries, setVolumeSeries] = useState();
  const view = useRef();

  useEffect(() => {
    if (candleSeries) {
      candleSeries.setData([...series]);
      volumeSeries.setData([...volume]);
    }
  }, [series, candleSeries, volume]);

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
        timeVisible: true,
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
  return <div ref={view} style={{ height: 400 }}></div>;
}

export default Chart;
