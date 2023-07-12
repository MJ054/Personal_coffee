const friendDao = require('../dao/friendDao');
const { body, validationResult } = require('express-validator');
require('express-async-errors')
var createError = require('http-errors')

module.exports = {
    friendList: async(req,res)=>{
        const userId = req.session.user.userId;

        const friends = await friendDao.friendList(userId);
        return res.status(200).json({data: friends});
    },

    requestFriendList: async(req,res)=>{
        const userId = req.session.user.userId;

        const friends = await friendDao.requestFriendList(userId);
        return res.status(200).json({data: friends});
    },

    addFriend: async(req,res)=>{
        const userId1 = req.session.user.userId;
        const userId2 = req.params.friendNickname;
            
        await friendDao.addFriend(userId1,userId2);
        return res.status(200).json();
    },


    requestFriend: async(req,res)=>{
        const userId1 = req.session.user.userId;
        const userId2 = req.params.friendNickname;

        await friendDao.requestFriend(userId1, userId2);
        return res.status(200).json();
    },

    deleteFriend: async(req,res)=>{
        const userId1 = req.session.user.userId;
        const userId2 = req.params.friendNickname;

        await friendDao.deleteFriend(userId1, userId2);
        return res.status(200).json();
    },

    friendRecipe: async(req,res)=>{
        const nickname = req.params.nickname;
        console.log(nickname);
        const recipe = await friendDao.friendRecipe(nickname);
        return res.status(200).json({data: recipe});
    },

    addFriendRecipe: async(req,res)=>{
        const userId = req.session.user.userId;
        const recipeId = req.params.recipeId;

        await friendDao.addFriendRecipe(userId, recipeId);
        return res.status(200).json();
    },


    searchFriend: async(req, res)=>{
        const userId = req.session.user.userId;
        const search = req.query.search;

        const rows = await friendDao.searchFriend(userId, search);
        return res.status(200).json(rows);
    }

}