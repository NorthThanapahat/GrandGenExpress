const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));



const db = require('./connectDB');


db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      console.log(db.state);

      if (db.state != "disconnected") {

      }
});

app.get('/', (req, res) => {
      res.json({ message: "Hello Grandgenexpress.com", db_status: db.state });
});

function GetResAuth(res, result, fields) {
      if (result[0] != undefined) {
            const user = {
                  username: result[0].username
            }
            console.log("result:", result[0]);
            console.log("fields:", fields);

            jwt.sign({ user }, 'token', (err, token) => {
                  res.json({
                        ResponseCode: "Success",
                        username: result[0].username,
                        token: token
                  });
            });
      } else {
            res.json({
                  ResponseCode: "Error",
                  ResponseMessage: "User or Password is valid"
            });
      }

}

function ConnectDB() {
      if (db.state != "authenticated") {
            db.connect(function (err) {
                  if (err) throw err;
                  Console.log("Database Connected!");
            });
      }
}

function verifyToken(req, res, next) {
      const tokenHeader = req.headers['token'];
      console.log(tokenHeader);
      if (typeof tokenHeader !== 'undefined') {
            req.token = tokenHeader;
            next();
      } else {
            res.sendStatus(403);
      }
}

app.post('/auth', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      console.log(req.body);
      ConnectDB();
      db.query("SELECT * FROM user WHERE username = '" + username + "'AND password = '" + password + "'", function (err, result, fields) {
            if (err) throw err;
            GetResAuth(res, result, fields);
      });
});

app.post('/userInfomation', (req, res) => {
      // console.log('req.token ===>',req.token);
      // jwt.verify(req.token, 'secretkey', (err, resultData) => {
      //       console.log(err);
      //       if (err) {
      //             res.sendStatus(403);
      //       } else {
                  var username = req.body.username;
                  ConnectDB();
                  db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
                        if (err) throw err;
                        // GetResAuth(res, result, fields);
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result[0]
                        });
                  });

      //       }
      // });
});
app.listen(7777, () => {
      console.log("server is running")
});
