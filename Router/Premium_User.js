const express = require('express');

const purchaseController = require('../controller/Premium_user');

const authentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership',authentication.authenticate, purchaseController.purchasepremium);

router.post('/updatetransactionstatus', authentication.authenticate,purchaseController.updateTransactionStatus);

module.exports = router;
