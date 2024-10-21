const csvtojson = require('csvtojson');
const Stock = require('../models/stock');

exports.uploadStockData = async (req, res) => {
  try {
    const csvData = await csvtojson().fromFile(req.file.path);
    const validData = [];
    const invalidData = [];
    let totalRecords = 0;

    csvData.forEach(row => {
      totalRecords++;
      const {
        Dated, Symbol, Series, Prev_Close, Open, High, Low, Last, Close, VWAP, Volume, Turnover, Trades, Deliverable_Volume, 
        Deliverble
      } = row;

      if (isNaN(Dated) ||isNaN(Symbol) || isNaN(Series) || isNaN(Prev_Close) || isNaN(Open) ||isNaN(High) || isNaN(Low) || isNaN(Last) ||isNaN(Close) || isNaN(VWAP) || isNaN(Volume) ||isNaN(Turnover) ||isNaN(Trades) ||isNaN(Deliverable_Volume) ||isNaN(Deliverble)) {
        invalidData.push({ row, reason: 'Invalid data format' });
      } else {
        validData.push({
          date: new Date(Dated), Symbol, Series, Prev_Close, Open, High, Low, Last, Close, VWAP, Volume, Turnover, Trades,Deliverable_Volume, Deliverble
        });
      }
    });

    await Stock.insertMany(validData);
    console.log('data uploaded successfully');
    res.status(200).json({
      totalRecords,
      successfulRecords: validData.length,
      failedRecords: invalidData.length,
      invalidData
    });
  } catch (error) {
    console.error('Erro uploading stock data ' , error);
    res.status(500).send('Error uploading stock data');
  }
};

exports.getHighestVolume = async (req, res) => {
  try {
    const { start_date, end_date, symbol } = req.body;
    const query = {
      date: { $gte: new Date(start_date), $lte: new Date(end_date) }
    };
    if (symbol) query.symbol = symbol;

    const highestVolume = await Stock.find(query).sort({ volume: -1 }).limit(1);
    res.status(200).json(highestVolume);
  } catch (error) {
    res.status(500).send('Error retrieving highest volume data');
  }
};

exports.getAverageClose = async (req, res) => {
  try {
    const { start_date, end_date, symbol } = req.query;
    const query = {
      date: { $gte: new Date(start_date), $lte: new Date(end_date) },
      symbol
    };

    const stocks = await Stock.find(query);
    const averageClose = stocks.reduce((acc, stock) => acc + stock.Close, 0) / stocks.length;
    res.status(200).json({ symbol, averageClose });
  } catch (error) {
    res.status(500).send('Error calculating average close price');
  }
};

exports.getAverageVWAP = async (req, res) => {
  try {
    const { start_date, end_date, symbol } = req.query;
    const query = {
      date: { $gte: new Date(start_date), $lte: new Date(end_date) }
    };
    if (symbol) query.symbol = symbol;

    const stocks = await Stock.find(query);
    const averageVWAP = stocks.reduce((acc, stock) => acc + stock.VWAP, 0) / stocks.length;
    res.status(200).json({ symbol, averageVWAP });
  } catch (error) {
    res.status(500).send('Error calculating average VWAP');
  }
};
