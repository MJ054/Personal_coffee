const express = require('express');
const app = express();
const db = require('../database').db;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/:uid', async (req, res) => {//특정 md만 get
    const uid = req.params.uid;
    
    try{
      //uid 입려받아서 id 가져오기
      console.log(uid);
      //let user_id = await db.execute(`select user_id from nfc where nfc_tag=?`,[uid]);
      //console.log(user_id);
    //id값으로 레시피 가져오기
      let [row2, field] = await db.execute(`select user.user_id,nickname,`+"name"+`,espresso,water,syrup,love from recipe join user on recipe.user_id=user.user_id where recipe.user_id in (select user_id from nfc where nfc_tag=?)`,[uid]);
      res.send(row2);
      console.log(row2);
    }
    catch (e) {
      console.log(e);
  }
});


app.get('/friend/:user_id', async (req, res) => {//특정 md만 get
  const user_id = req.params.user_id;
  
  try{
    //uid 입려받아서 id 가져오기
    //let user_id = await db.execute(`select user_id from user where uid=?`,[uid]);
    //let user_id=8;
  //id값으로 레시피 가져오기
    let [row2, field] = await db.execute(`SELECT user_id,nickname FROM friend F, user U WHERE CASE WHEN F.user_id1 = ? THEN F.user_id2 = U.user_id WHEN F.user_id2= ? THEN F.user_id1= U.user_id END AND status = 1`,[user_id,user_id]);
    res.send(row2);
    console.log(row2);
  }
  catch (e) {
    console.log(e);
}
});

app.get('/friend/rcp/:id', async (req, res) => {//특정 md만 get
  const user_id = req.params.id;
  console.log(user_id);
  //const user_id = 9;
  try{
    console.log("친구레시피");
  //id값으로 레시피 가져오기
    let [row2, field] = await db.execute(`select user.user_id,nickname,`+"name"+`,espresso,water,syrup from recipe join user on recipe.user_id=user.user_id where recipe.user_id=? and open=1`,[user_id]);
    res.send(row2);
    console.log(row2);
    console.log("-------------------여기까지");
  }
  catch (e) {
    console.log(e);
}
});
module.exports = app;