import { createChart, CrosshairMode } from "lightweight-charts";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PropertiesContext } from "../../../context/ChartPropertiesContext";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../../../context/ChartDataContext";
import { quote } from "../../../api/stock";

const indicatorDetails = {
  ema: "line",
  sma: "line",
  volume: "histogram"
};

function Chart({ fullscreen }) {
  const [chartSeries, setChartSeries] = useState(null);
  const [indicator, setIndicator] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const view = useRef();

  const { stock } = useParams();
  const {
    state: chartPropertieState,
    dispatch: chartPropertieDispatch
  } = useContext(PropertiesContext);
  const { state: chartDataState } = useContext(DataContext);

  const makeChart = () => {
    view.current.innerHTML = "";
    const chart = createChart(document.getElementById("chart-area"), {
      width: view.current.clientWidth,
      height: view.current.clientHeight,
      layout: {
        // backgroundColor: "#253248",
        backgroundColor: "#fff",
        // textColor: "rgba(255, 255, 255, 0.9)",
        textColor: "#aaacb8;"
      },
      grid: {
        vertLines: {
          // color: "#334158"
          color: "#fff"
        },
        horzLines: {
          // color: "#334158"
          color: "#fff"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#fff"
      },
      timeScale: {
        // borderColor: "#485c7b",
        borderColor: "#aaacb8",
        timeVisible: true
      }
    });

    setChartSeries(chart);
    new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== view.current) {
        return;
      }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
    }).observe(view.current);
  };

  const createTimeline = () => {
    timeline.forEach((ele) => ele.data.setData([]));
    let data;
    if (
      timeline &&
      timeline.some((ele) => ele.name === chartPropertieState.chart)
    ) {
      data = timeline.find((ele) => ele.name === chartPropertieState.chart)
        .data;
    } else {
      if (chartPropertieState.chart === "candles") {
        data = chartSeries.addCandlestickSeries({
          // upColor: "#4bffb5",
          // downColor: "#ff4976",
          // borderDownColor: "#ff4976",
          // borderUpColor: "#4bffb5",
          // wickDownColor: "#838ca1",
          // wickUpColor: "#838ca1"
          upColor: "#0f9d58",
          downColor: "#a52714",
          borderDownColor: "#a52714",
          borderUpColor: "#0f9d58",
          wickDownColor: "#aaacb8",
          wickUpColor: "#aaacb8"
        });
      } else {
        data = chartSeries.addAreaSeries({
          topColor: "#4f39f6",
          bottomColor: "rgba(255, 255, 255, 0)",
          lineColor: "#4f39f6",
          lineWidth: 1
        });
      }

      setTimeline([
        ...timeline,
        { name: chartPropertieState.chart, data: data }
      ]);
    }

    data.setData(
      chartPropertieState.chart === "candles"
        ? [...chartDataState.ohcl]
        : [...chartDataState.area]
    );
  };

  const removeSeries = (id) => {
    setIndicator(
      indicator.filter((ele) => {
        if (ele.id === id) {
          chartSeries.removeSeries(ele.indicator);
        }
        return ele.id !== id;
      })
    );
  };

  const createIndicator = () => {
    chartPropertieState.indicator.forEach((ind) => {
      let data;
      if (!indicator.find((ele) => ele.name === ind)) {
        if (indicatorDetails[ind] === "line") {
        } else {
          data = chartSeries.addHistogramSeries({
            // color: "#182233",
            color: "rgba(0,0,0,0.1)",
            lineWidth: 1,
            priceFormat: {
              type: "volume"
            },
            overlay: true,
            scaleMargins: {
              top: 0.8,
              bottom: 0
            }
          });
        }

        setTimeline([...timeline, { name: ind, data: data }]);
        setIndicator([
          ...indicator,
          {
            id: uuidv4(),
            indicator: data,
            name: ind
          }
        ]);
      } else {
        data = indicator.find((ele) => ele.name === ind).indicator;
      }

      data && data.setData([...chartDataState.volume]);
    });
  };

  useEffect(() => {
    if (chartSeries) {
      createTimeline();
      createIndicator();
    }
  }, [chartDataState, chartPropertieState, chartSeries]);

  useEffect(() => {
    if (!chartSeries) {
      makeChart();
    }

    console.log(quote(stock));
  }, []);

  return (
    <div className="relative">
      <div className="legend">
        <p className="title text-white">{`${stock} ${chartPropertieState.interval}`}</p>
        <div className="active_indicator">
          {indicator.map((ele) => (
            <button
              id={ele.id}
              onClick={() => {
                removeSeries(ele.id);
                chartPropertieDispatch({
                  type: "remove-indicator",
                  payload: ele.name
                });
              }}
            >
              <i className="fas fa-times"></i>
              <p>{ele.name}</p>
            </button>
          ))}
        </div>
      </div>
      <div
        ref={view}
        style={{ height: 400, width: "100%", position: "relative" }}
        id="chart-area"
      ></div>
    </div>
  );
}

export default Chart;
