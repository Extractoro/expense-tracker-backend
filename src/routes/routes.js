const express = require("express");
const UserCreation = require("../models/userCreation");
const incomeExpensesJoiSchema = require("../models/incomeExpensesJoiSchema");
const cardsJoiSchema = require("../models/cardsJoiSchema");

const router = express.Router();

router.post("/user/create", async (req, res) => {
  const data = new UserCreation({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
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

router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req?.params;
    const result = await UserCreation.findOne({ userEmail: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/card/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = cardsJoiSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "Missing fields" });
    }
    const data = req.body;

    const result = await UserCreation.findByIdAndUpdate(
      id,
      { $push: { cards: data } },
      {
        new: true,
      }
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/operations/update/:id/:variant", async (req, res) => {
  try {
    const id = req.params.id;
    const variant = req.params.variant;
    const { error } = incomeExpensesJoiSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "Missing fields" });
    }
    const data = req.body;

    if (variant === "incomes") {
      const result = await UserCreation.findByIdAndUpdate(
        id,
        { $push: { incomes: data } },
        {
          new: true,
        }
      );
      res.send(result);
    } else {
      const result = await UserCreation.findByIdAndUpdate(
        id,
        { $push: { expenses: data } },
        {
          new: true,
        }
      );
      res.send(result);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// not working
router.patch("/user/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = incomeExpensesJoiSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "Missing fields" });
    }
    const data = req.body;

    if (variant === "incomes") {
      const result = await UserCreation.findByIdAndUpdate(
        id,
        { $push: { incomes: data } },
        {
          new: true,
        }
      );
      res.send(result);
    } else {
      const result = await UserCreation.findByIdAndUpdate(
        id,
        { $push: { expenses: data } },
        {
          new: true,
        }
      );
      res.send(result);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// not working
router.delete("/user/delete/:id", async (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;
