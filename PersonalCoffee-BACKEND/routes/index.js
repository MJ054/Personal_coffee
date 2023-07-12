const express = require('express');
const router = express.Router();

const recipeRouter = require("./recipeRouter");
//const userRouter = require("./userRouter");
const friendsRouter = require("./friendsRouter");

const recipe = require("../coffeeUI/recipe");

router.use("/recipe", recipeRouter);
//router.use("/user", userRouter);
router.use("/friend", friendsRouter);

//예진
router.use("/api/recipe", recipe);

module.exports = router;