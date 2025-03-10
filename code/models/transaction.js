const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    // ... other transaction fields
});

module.exports = mongoose.model('Transaction', transactionSchema);