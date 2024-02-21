const express = require("express");
const UserCreation = require("../models/userCreation");
const Operations = require("../models/operationsSchema");
const Cards = require("../models/cardsSchema");
const incomeExpensesJoiSchema = require("../models/incomeExpensesJoiSchema");
const cardsJoiSchema = require("../models/cardsJoiSchema");

const router = express.Router();

router.post("/user/create", async (req, res) => {
  const data = new UserCreation({
    cards: req.body.cards,
    incomes: req.body.incomes,
    expenses: req.body.expenses,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/card", async (req, res) => {
  const { error } = cardsJoiSchema.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }

  const data = new Cards({ ...req.body });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/operations", async (req, res) => {
  const { error } = incomeExpensesJoiSchema.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }

  const data = new Operations({ ...req.body });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  res.send("Get by ID API");
});

router.patch("/user/update/:id", async (req, res) => {
  res.send("Update by ID API");
});

router.delete("/user/delete/:id", async (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;
