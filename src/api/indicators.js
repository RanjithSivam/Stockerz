import axios from 'axios';

const restTemplate = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: process.env.REACT_APP_ALPHA_VANTAGE_API,
  },
});

const parseData = (data) => {
  const rawDate = Object.keys(data[Object.keys(data)[1]]);
  const rawSeries = Object.values(data[Object.keys(data)[1]]);
  let series = rawSeries.map((curr) => [curr[Object.keys(rawSeries[0])[0]]]);

  const tradingView = series.map((curr, index) => {
    return {
      time: rawDate[index],
      value: parseFloat(curr),
    };
  });

  tradingView.reverse();

  return tradingView;
};

const sma = async (
  symbol,
  interval = 'weekly',
  timePeriod = 20,
  seriesType = 'close'
) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'SMA',
      symbol: symbol,
      interval: interval,
      time_period: timePeriod,
      series_type: seriesType,
    },
  });

  return parseData(data);
};

const ema = async (
  symbol,
  interval = 'weekly',
  timePeriod = 20,
  seriesType = 'close'
) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'EMA',
      symbol: symbol,
      interval: interval,
      time_period: timePeriod,
      series_type: seriesType,
    },
  });

  return parseData(data);
};

export { sma, ema };
