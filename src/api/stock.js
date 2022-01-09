import axios from "axios";

const restTemplateFin = axios.create({
  baseURL: "https://finnhub.io/api/v1/stock",
  params: {
    token: process.env.REACT_APP_FINNHUB_API
  }
});

const restTemplateAlpha = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  params: {
    apikey: process.env.REACT_APP_ALPHA_VANTAGE_API
  }
});

const candle = async (symbol, resolution) => {
  const { data } = await restTemplateFin.get("/candle", {
    params: {
      symbol: symbol,
      resolution: resolution,
      from: parseInt(new Date("01-01-2000").getTime() / 1000),
      to: parseInt(new Date().getTime() / 1000),
      token: process.env.REACT_APP_FINNHUB_API
    }
  });

  const ohcl = Object.values(data)[0].map((res, index) => {
    return {
      time: Object.values(data)[5][index],
      open: Object.values(data)[3][index],
      high: Object.values(data)[1][index],
      close: Object.values(data)[0][index],
      low: Object.values(data)[2][index]
    };
  });

  const volume = Object.values(data)[0].map((res, index) => {
    return {
      time: Object.values(data)[5][index],
      value: Object.values(data)[6][index]
    };
  });

  const area = Object.values(data)[0].map((res, index) => {
    return {
      time: Object.values(data)[5][index],
      value: Object.values(data)[0][index]
    };
  });

  return { ohcl: ohcl, volume: volume, area: area };
};

const quote = async (symbol) => {
  const { data } = await restTemplateAlpha.get("", {
    params: {
      function: "GLOBAL_QUOTE",
      symbol: symbol
    }
  });

  const value = Object.values(data[Object.keys(data)[0]]);

  return {
    data: [
      {
        name: "open",
        value: parseFloat(value[1]).toFixed(4)
      },
      {
        name: "high",
        value: parseFloat(value[2]).toFixed(4)
      },
      {
        name: "low",
        value: parseFloat(value[3]).toFixed(4)
      },
      {
        name: "price",
        value: parseFloat(value[4]).toFixed(4)
      },
      {
        name: "volume",
        value: parseInt(value[5], 10)
      },
      {
        name: "% change",
        value: value[value.length - 1].slice(0, value[value.length - 1].length)
      }
    ]
  };
};

const profile = async (symbol) => {
  const { data: alphaData } = await restTemplateAlpha.get("", {
    params: {
      function: "OVERVIEW",
      symbol: symbol
    }
  });

  const { data: finData } = await restTemplateFin.get("/profile2", {
    params: {
      symbol: symbol
    }
  });

  return {
    data: [
      {
        name: "exchange",
        value: String(finData.exchange).toLocaleLowerCase()
      },
      {
        name: "capitalization",
        value: parseInt(finData.marketCapitalization, 10)
      },
      {
        name: "industry",
        value: String(alphaData.Industry).toLocaleLowerCase()
      },
      {
        name: "pe ratio",
        value: parseFloat(alphaData.PERatio).toFixed(4)
      },
      {
        name: "dps",
        value: parseFloat(alphaData.DividendPerShare).toFixed(4)
      },
      {
        name: "eps",
        value: parseFloat(alphaData.EPS).toFixed(4)
      },
      {
        name: "profit margin",
        value: alphaData.ProfitMargin
      }
    ]
  };
};

export { candle, quote, profile };
