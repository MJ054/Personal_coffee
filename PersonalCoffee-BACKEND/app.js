
const database = require('./database');
const router = require('./routes/index');

const express = require('express');
const app = express();
const session = require('express-session');


var MySQLStore = require('express-mysql-session')(session);

app.set('port', process.env.PORT || 3000);

var sessionStore = new MySQLStore(database.options);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));

app.use(express.urlencoded({
      extended: false
    }));
app.use(express.json());

app.use(router);



app.get("/test", (req,res)=>{
  console.log("test");
})


app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({ errors: err.message });
  } else {
    res.status(500).send({ errors: "Internal Server Error" });
  }
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})