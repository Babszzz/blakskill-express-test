const Trade = require("../models/trades");

const createTrade = async (req, res) => {
  try {
    const { type, user_id, symbol, shares, price, timestamp } = req.body;

    const allowedFields = [
      "type",
      "user_id",
      "symbol",
      "shares",
      "price",
      "timestamp",
    ];

    const extraFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );

    if (extraFields.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: `Invalid fields: ${extraFields.join(", ")}`,
      });
    }

    const missingFields = [];

    if (!type) missingFields.push("type");
    if (!user_id) missingFields.push("user_id");
    if (!symbol) missingFields.push("symbol");
    if (!shares) missingFields.push("shares");
    if (!price) missingFields.push("price");
    if (!timestamp) missingFields.push("timestamp");

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const trade = await Trade.create({
      type,
      user_id,
      symbol,
      shares,
      price,
      timestamp,
    });

    res.status(201).json(trade);
  } catch (error) {
    console.error("Error creating trade:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const getAllTrades = async (req, res) => {
  try {
    const { type, user_id } = req.query;

    const where = {};
    if (type) where.type = type;
    if (user_id) where.user_id = user_id;

    const trades = await Trade.findAll({ where });

    res.status(200).json(trades);
  } catch (error) {
    console.error("Error fetching trades:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id);

    if (!trade) {
      return res.status(404).send("ID not found");
    }

    res.status(200).json(trade);
  } catch (error) {
    console.error("Error fetching trade by ID:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const methodNotAllowed = (req, res) => {
  return res.sendStatus(405);
};

module.exports = { createTrade, getAllTrades, getTradeById, methodNotAllowed };
