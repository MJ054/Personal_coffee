const recipeDao = require('../dao/recipeDao');
const { body, validationResult } = require('express-validator');
require('express-async-errors')
var createError = require('http-errors')

module.exports = {

    createRecipe: async (req,res)=>{
        const {
            name,
            espresso,
            water,
            syrup
        } = req.body;

        const userId = req.session.user.userId;
        await recipeDao.createRecipe(userId, name, espresso, water, syrup);
        return res.status(200).json();
    },

    deleteRecipe: async (req,res)=>{
        const recipeId = req.params.recipeId;
        await recipeDao.deleteRecipe(recipeId);
        return res.status(200).json();
    },

    updateRecipe: async (req,res)=>{
        const {
            name,
            espresso,
            water,
            syrup
        } = req.body;
        const recipeId = req.params.recipeId;
        await recipeDao.updateRecipe(name, espresso, water, syrup, recipeId);
        return res.status(200).json();
    },

    RecipeList: async (req,res)=>{
        const userId = req.session.user.userId;
        const nickname = req.session.user.nickname;
        const rows = await recipeDao.recipeList(userId);
        return res.status(200).json({userId: userId, nickname:nickname, data: rows});
    },

    likeRecipe: async (req,res)=>{

        const loveId = req.params.loveId;
        const recipeId = req.params.recipeId;
        
        await recipeDao.likeRecipe(loveId, recipeId);
        return res.status(200);

    },
    recommandRecipe: async (req,res)=>{
        const rows = await recipeDao.recommandRecipe();
        return res.status(200).json({data: rows});
    }

}