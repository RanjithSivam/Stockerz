import axios from 'axios';

const restTemplate = axios.create({
  baseURL: 'https://finnhub.io/api/v1/stock/candle',
  params: {
    token: process.env.REACT_APP_FINNHUB_API,
  },
});

const candle = async (symbol, resolution) => {
  const { data } = await restTemplate.get('', {
    params: {
      symbol: symbol,
      resolution: resolution,
      from: parseInt(new Date('01-01-2000').getTime() / 1000),
      to: parseInt(new Date().getTime() / 1000),
      token: process.env.REACT_APP_FINNHUB_API,
    },
  });

  const ohcl = Object.values(data)[0].map((res, index) => {
    return {
      time: Object.values(data)[5][index],
      open: Object.values(data)[3][index],
      high: Object.values(data)[1][index],
      close: Object.values(data)[0][index],
      low: Object.values(data)[2][index],
    };
  });

  const volume = Object.values(data)[0].map((res, index) => {
    return {
      time: Object.values(data)[5][index],
      value: Object.values(data)[6][index],
    };
  });

  return { ohcl: ohcl, volume: volume };
};

export { candle };
