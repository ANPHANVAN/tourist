//  import from library
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('./config/session');
require('dotenv').config();

// import from my file
const route = require('./routes');
const mongodb = require('./config/db/mongodb');
mongodb.connect()

const postgre = require('./config/db/postgres');
postgre.connect()

const redis = require('./config/db/redis');
redis.connect()

app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(express.json());        // Đọc body dạng JSON
app.use(express.urlencoded({ extended: true }));  // Đọc form (x-www-form-urlencoded)
app.use(session); // Thêm express-session

app.set('view engine' , 'ejs');
app.set('views', 'src/views');
app.set('layout', 'layouts/main'); // Đảm bảo layout chính được chỉ định
app.use(expressLayouts);
app.use(cookieParser());

route(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});