const db = require('../database').db;

module.exports = {

    createRecipe: async (userId, name, espresso, water, syrup) => {
        let sql = 'INSERT INTO recipe(user_id, name, espresso, water, syrup) VALUES(?,?,?,?,?);'
        await db.query(sql, [userId, name, espresso, water, syrup]);
    },

    deleteRecipe: async (recipeId) => {
        let sql = 'DELETE FROM recipe WHERE recipe_id=?'
        await db.query(sql, [recipeId]);
    },

    updateRecipe: async (name, espresso, water, syrup, recipeId) => {
        let sql = 'UPDATE recipe SET name=?, espresso=?, water=?, syrup=? WHERE recipe_id=?'
        await db.query(sql, [name, espresso, water, syrup, recipeId]);
    },

    recipeList: async (userId) => {
        let sql = 'SELECT recipe_id, espresso, water, syrup, name, love FROM recipe WHERE user_id=? order by love DESC;'
        const [rows] = await db.query(sql, [userId]);
        return rows;
    },

    likeRecipe: async (loveId, recipeId) => {
        let sql = "UPDATE recipe SET love=? WHERE recipe_id=?";
        await db.query(sql, [loveId, recipeId]);
    },

    recommandRecipe: async () => {
        try {
            let sql = "SELECT recipe_id, espresso, water, syrup, name, love FROM recipe WHERE user_id=?";
            const [rows] = await db.query(sql, [15]);
            return rows;
        } catch (error) {

        }
    }
}