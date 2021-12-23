import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useEffect } from 'react/cjs/react.development';
import { ema } from '../../api/indicators';

function EMA({ stock, interval }) {
  const [series, setSeries] = useState([]);

  const modifyInterval = () => {
    setSeries([]);
    switch (interval.value) {
      case 1:
        ema(stock, `${interval.interval}min`).then((res) => setSeries(res));
        break;
      case 2:
        ema(stock, 'daily').then((res) => setSeries(res));
        break;
      case 3:
        ema(stock, 'weekly').then((res) => setSeries(res));
        break;
      case 4:
        ema(stock, 'monthly').then((res) => setSeries(res));
        break;
      default:
    }
  };

  useEffect(() => {
    modifyInterval();
  }, [interval]);

  return (
    <div className="indiactor indicator_ema">
      <ReactApexChart
        options={{
          chart: {
            type: 'candlestick',
            height: 350,
            toolbar: {
              show: true,
              tools: {
                download: true,
                zoomin: true,
                zoomout: true,
                selection: false,
                zoom: false,
                pan: true,
                reset: false,
              },
            },
          },
          noData: {
            text: 'Loading....',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
          },
          title: {
            text: 'EMA Chart',
            align: 'left',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
        series={[
          {
            data: series,
          },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
}

export default EMA;
