const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  Date: {
     type: Date, 
     required: true 
  },
  Symbol: { 
    type: String, 
    required: true 
  },
  
  Series: { 
    type: String, 
    required: true 
  },
  Prev_Close: { 
    type: Number, 
    required: true 
  },
  Open: { 
    type: Number, 
    required: true 
  },
  High: { 
    type: Number, 
    required: true 
  },
  Low: { 
    type: Number, 
    required: true 
  },
  Last: { 
    type: Number, 
    required: true 
  },
  Close: { 
    type: Number, 
    required: true 
  },
  VWAP: { 
    type: Number, 
    required: true 
  },
  Volume: { 
    type: Number, 
    required: true 
  },
  Turnover: { 
    type: Number, 
    required: true 
  },
  Trades: { 
    type: Number, 
  },
  Deliverable_Volume: { 
    type: Number, 
  },
  Deliverble: { 
    type: Number, 
  }
});
module.exports = mongoose.model('Stock', stockSchema);
