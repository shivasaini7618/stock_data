const express = require('express');
const multer = require('multer');
const { uploadStockData, getHighestVolume, getAverageClose, getAverageVWAP } = require('../controllers/stockControllers');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadStockData);
router.get('/highest_volume', getHighestVolume);
router.get('/average_close', getAverageClose);
router.get('/average_vwap', getAverageVWAP);

module.exports = router;
