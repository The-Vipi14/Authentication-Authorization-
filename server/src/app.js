// const express = require('express');
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const session = require("express-session");
// const connectMongo = require('connect-mongo');
// const MongoStore = connectMongo.default


// const userRoute = require('./routes/user.routes')
// const userSessionRoute = require('./routes/sessionAuth.routes')

// const app = express();

// app.use(cookieParser())
// app.use(express.json())

// app.use(
//   session({
//     name: "auth_session",
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URL,
//       collectionName: "sessions",
//     }),
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
// // app.use(
// //   session({
// //     name: "sid",
// //     secret: process.env.SESSION_SECRET || "supersecret",
// //     resave: false,
// //     saveUninitialized: false,
// //     store: MongoStore.create({
// //       mongoUrl: process.env.MONGO_URI
// //     }),
// //     cookie: {
// //       httpOnly: true,
// //       secure: false,
// //       maxAge: 1000 * 60 * 60 * 24,
// //     },
// //   })
// // );

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))

// app.use('/api/user', userRoute);
// app.use('/api/auth', userSessionRoute);

// module.exports = app;



const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const connectMongo = require('connect-mongo');

const MongoStore = connectMongo.default;

const userRoute = require('./routes/user.routes');
const userSessionRoute = require('./routes/sessionAuth.routes');

const app = express();

app.use(express.json());

app.use( 
  session({
    name: "auth_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// cookie-parser AFTER session
app.use(cookieParser());
 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
 
app.use('/api/user', userRoute);
app.use('/api/auth', userSessionRoute);
 
module.exports = app;
