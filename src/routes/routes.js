const express = require("express");
const {
  User,
  validateUser,
  validateLoginUser,
} = require("../models/userCreation");
const jwt = require("jsonwebtoken");
const incomeExpensesJoiSchema = require("../models/incomeExpensesJoiSchema");
const cardsJoiSchema = require("../models/cardsJoiSchema");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/user/registration", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ userEmail: req.body.email });
  if (user && (await bcrypt.compare(email, user.email))) {
    return res.status(400).send("User already exisits. Please sign in");
  } else {
    try {
      const user = new User({
        userName: req.body.name,
        userEmail: req.body.email,
        password: req.body.password,
      });
      await user.save();
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
});

router.post("/user/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log(req.body.email);
  let user = await User.findOne({ userEmail: req.body.email });

  console.log(req.body.email);

  if (!user) {
    throw new Error("No user with this email");
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new Error("Email or password is wrong");
  }

  try {
    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

/*
{
    "email": "easqdew@gmail.com",
    "password": "vadymeor0" 
}
*/

router.use(authMiddleware);

router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req?.params;
    const result = await User.findOne({ userEmail: email });
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

    const result = await User.findByIdAndUpdate(
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
      const result = await User.findByIdAndUpdate(
        id,
        { $push: { incomes: data } },
        {
          new: true,
        }
      );
      res.send(result);
    } else {
      const result = await User.findByIdAndUpdate(
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
      const result = await User.findByIdAndUpdate(
        id,
        { $push: { incomes: data } },
        {
          new: true,
        }
      );
      res.send(result);
    } else {
      const result = await User.findByIdAndUpdate(
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
