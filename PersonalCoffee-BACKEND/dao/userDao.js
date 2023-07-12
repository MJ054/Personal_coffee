const db = require('../database').db;

module.exports = {

        checkNicknameDuplicate: async (nickname) => {
                let sql = 'SELECT COUNT(*) as count FROM user WHERE nickname = ?';
                const [rows] = await db.query(sql, [nickname]);
                return rows[0].count;
        },

        checkIdDuplicate: async (id) => {
                let sql = 'SELECT COUNT(*) as count FROM user WHERE id = ?';
                const [rows] = await db.query(sql, [id]);
                return rows[0].count;
        },


        register: async (id, password, nickname, salt) => {
                let sql = 'INSERT INTO user VALUES(0, ?,?,?)';
                await db.query(sql, [id, password, nickname]);
        },

        login: async (id) => {
                let sql = 'SELECT user_id, nickname, password from user WHERE id = ?'
                const [rows] = await db.query(sql, [id]);
                if (rows && rows.length > 0) {

                        const userId = rows[0].user_id;
                        const nickname = rows[0].nickname;
                        const hashedPassword = rows[0].password;

                        return { userId, nickname, hashedPassword };
                } else {
                        throw createError(400, "아이디가 존재하지 않습니다");
                }
        },

        addNfc: async (userId, nfcId) => {
                let sql = 'INSERT INTO nfc VALUES(0, ?, ?);'
                const [rows] = await db.query(sql, [userId, nfcId]);
        }
}

