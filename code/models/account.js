const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    // ... other account fields
});

module.exports = mongoose.model('Account', accountSchema);
