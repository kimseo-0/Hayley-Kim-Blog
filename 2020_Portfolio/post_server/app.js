const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressSession = require('express-session');

const dotEnv = require('dotenv');
dotEnv.config(); // 암호화 모듈 실행

const passport = require('passport');
const passportIndex = require('./passport/index');
passportIndex(passport);

const MongoStore = require('connect-mongo')(expressSession);
const MONGO_URL = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;

const cors = require('cors');

const {sequelize} = require('./models/index');
sequelize.sync({force : false});

const sessionMiddleware = expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'userChecker',
    store: new MongoStore({
        url: MONGO_URL,
        collection: "sessions"
    }),
});

const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev')); // morgan이 가장 위

app.use(cors({
    origin:['http://localhost:3001', 'http://localhost:3002'],
    credentials : true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(path.join(__dirname, 'public'))); // 이경로로 들어 왔을 때, 무조건 적으로 보여주는 내용 -> 보안 필요 -> url 꼬아주기
app.use('/public', express.static(path.join(__dirname, 'open')));

app.use('/post', postRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
    app,
    sessionMiddleware
};
