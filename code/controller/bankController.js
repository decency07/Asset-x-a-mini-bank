const Account = require("../models/account");
const Transaction = require("../models/transaction");

// Create Account
exports.createAccount = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).json({ message: "Account created", account });
    } catch (error) {
        res.status(400).json({ message: "Account creation failed", error: error.message });
    }
};

// Deposit Money
exports.deposit = async (req, res) => {
    try {
        const { accountId, amount } = req.body;
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ message: "Account not found" });

        account.balance += amount;
        await account.save();

        const transaction = new Transaction({ accountId, type: "deposit", amount });
        await transaction.save();

        res.status(200).json({ message: "Deposit successful", account });
    } catch (error) {
        res.status(500).json({ message: "Deposit failed", error: error.message });
    }
};

// Withdraw Money
exports.withdraw = async (req, res) => {
    try {
        const { accountId, accountNumber, amount } = req.body;

        // Find account by ID or accountNumber
        let account;
        if (accountId) {
            account = await Account.findById(accountId);
        } else if (accountNumber) {
            account = await Account.findOne({ accountNumber });
        }

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Check if balance is sufficient
        if (account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct the amount
        account.balance -= amount;
        await account.save();

        // Record transaction
        const transaction = new Transaction({
            accountId: account._id,
            type: "withdrawal",
            amount,
        });
        await transaction.save();

        res.status(200).json({ message: "Withdrawal successful", account });
    } catch (error) {
        res.status(500).json({ message: "Withdrawal failed", error: error.message });
    }
};
