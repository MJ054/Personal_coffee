const db = require('../database').db;

module.exports = {

    //친구 목록
    friendList: async(userId)=>{
            let sql = 'SELECT nickname FROM friend F, user U'
            +' WHERE CASE WHEN F.user_id1 = ? THEN F.user_id2 = U.user_id WHEN F.user_id2= ? THEN F.user_id1= U.user_id END' 
            +' AND status = 1';
            const [rows] = await db.query(sql, [userId, userId]);
            return rows;
    },


    //친구 신청
    requestFriend: async(userId1, userId2)=>{
            let sql = 'INSERT INTO friend(user_id1, user_id2) VALUES(?, (SELECT user_id FROM personalcoffee.user WHERE nickname=?))';
            await db.query(sql, [userId1, userId2]);
            return;
    },

    //친구 신청 리스트(친구 신청 받은 사람 기준)
    requestFriendList: async(userId)=>{
            let sql = 'SELECT user_id1, nickname FROM friend f, user u WHERE f.user_id1 = u.user_id AND user_id2=? AND status=0;';
            const [rows] = await db.query(sql, [userId]);
            return rows;
    },

    deleteFriend: async(userId1, userId2)=>{
            let sql = 'DELETE FROM friend WHERE ((user_id1 = ? AND user_id2 = (SELECT user_id FROM user WHERE nickname=?)) OR (user_id1 = (SELECT user_id FROM user WHERE nickname=?) AND user_id2 = ?)) AND status=1;';
            await db.query(sql, [userId1, userId2, userId2, userId1]);
            return;
    },

    
    //친구 수락
    addFriend: async(userId1, userId2)=>{
            let sql = 'UPDATE friend SET status=1 WHERE user_id1 IN (SELECT user_id FROM personalcoffee.user WHERE nickname=?) AND user_id2=?';
            await db.query(sql, [userId2, userId1]);
    },

    //친구 레시피 상세
    friendRecipe: async(nickname)=>{
            let sql = 'SELECT * FROM recipe WHERE user_id IN (SELECT user_id FROM user WHERE nickname=?)';
            const [rows] = await db.query(sql, [nickname]);
            return rows;
    },

    //친구 레시피 내 레시피로
    addFriendRecipe: async(userId, recipeId)=>{
        let sql = 'INSERT INTO recipe(name, espresso, water, syrup, user_id) (SELECT name, espresso, water, syrup, ? FROM recipe WHERE recipe_id=?)'
        await db.query(sql, [userId, recipeId]);
    },
    
    //친구 검색
    searchFriend: async(userId, search)=>{
            const query = "%"+search+"%";
            let sql = 'SELECT  nickname, status FROM user U LEFT JOIN friend F ON (CASE WHEN F.user_id1 = ? THEN F.user_id2 = U.user_id WHEN F.user_id2= ? THEN F.user_id1= U.user_id END)  WHERE user_id NOT IN (?) AND nickname LIKE ?'
            const [rows] = await db.query(sql, [userId, userId, userId, query]);
            return rows;
    }

}