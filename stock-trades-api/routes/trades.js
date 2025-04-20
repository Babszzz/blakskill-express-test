const express = require("express");
const router = express.Router();

const {
  createTrade,
  getAllTrades,
  getTradeById,
  methodNotAllowed,
} = require("../controllers/trades");

router.post("/", createTrade);
router.get("/", getAllTrades);
router.get("/:id", getTradeById);
router.delete("/:id", methodNotAllowed);
router.put("/:id", methodNotAllowed);
router.patch("/:id", methodNotAllowed);

module.exports = router;
