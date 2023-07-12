const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', (req, res)=>{
    res.send('recipe');
});

//레시피 생성
router.post('/', recipeController.createRecipe);

//레시피 삭제
router.delete('/:recipeId', recipeController.deleteRecipe);

//레시피 수정
router.put('/:recipeId', recipeController.updateRecipe);

//레시피 목록
router.get('/list', recipeController.RecipeList);

//레시피 하트
router.patch('/like/:recipeId/:loveId', recipeController.likeRecipe);

//레시피 하트 취소
//router.patch('/unlike/:recipeId', recipeRouter.unlikeRecipe);

router.get('/recommend', recipeController.recommandRecipe);


module.exports = router;