import axios from 'axios';

const restTemplate = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: process.env.REACT_APP_ALPHA_VANTAGE_API,
    outputsize: 'full',
  },
});

const parseData = (data) => {
  const rawDate = Object.keys(data[Object.keys(data)[1]]);
  const date = rawDate.map((curr) => new Date(curr).getTime());
  const rawSeries = Object.values(data[Object.keys(data)[1]]);
  const series = rawSeries.map((curr) => [
    curr['1. open'],
    curr['2. high'],
    curr['3. low'],
    curr['4. close'],
    curr['5. volume'],
  ]);

  const tradingViewData = date.map((curr, index) => {
    return {
      time: new Date(curr).toISOString().substring(0, 10),
      open: parseFloat(series[index][0]),
      high: parseFloat(series[index][1]),
      low: parseFloat(series[index][2]),
      close: parseFloat(series[index][3]),
    };
  });

  const tradingViewVolume = date.map((curr, index) => {
    return {
      time: new Date(curr).toISOString().substring(0, 10),
      value: parseFloat(series[index][4]),
    };
  });
  tradingViewData.reverse();
  tradingViewVolume.reverse();
  return { data: tradingViewData, volume: tradingViewVolume };
};

const intraDay = async (symbol, interval) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: interval + 'min',
    },
  });

  return parseData(data);
};

const daily = async (symbol) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
    },
  });
  return parseData(data);
};

const weekly = async (symbol) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'TIME_SERIES_WEEKLY',
      symbol: symbol,
    },
  });

  return parseData(data);
};

const monthly = async (symbol) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'TIME_SERIES_MONTHLY',
      symbol: symbol,
    },
  });

  return parseData(data);
};

const searchStock = async (symbol) => {
  const { data } = await restTemplate.get('', {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: symbol,
    },
  });

  return data.bestMatches;
};
export { intraDay, daily, weekly, monthly, searchStock };
