const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

//친구 목록
router.get('/list', friendController.friendList);

//친구 신청 리스트
router.get('/list/request', friendController.requestFriendList);

//친구 신청
router.post('/request/:friendNickname',friendController.requestFriend);

//친구 삭제
router.delete('/:friendNickname', friendController.deleteFriend);

//친구 수락
router.post('/add/:friendNickname', friendController.addFriend);

//친구 레시피 상세
router.get('/:nickname/recipe', friendController.friendRecipe);

//친구 레시피 내 레시피
router.post('/recipe/:recipeId', friendController.addFriendRecipe);

//친구 검색
router.get('/search', friendController.searchFriend);

module.exports = router;