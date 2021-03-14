if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRounter = require('./routes/index');
const authorRounter = require('./routes/authors');
const bookRounter = require('./routes/books');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose');
const { use } = require('./routes/index');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() => console.log('Connected to Mongoose'));

app.use('/', indexRounter);
app.use('/authors', authorRounter);
app.use('/books',bookRounter);

app.listen(process.env.PORT ||3000);