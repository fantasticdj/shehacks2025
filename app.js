const express = require('express')
const app = express()
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const PORT = 3000;

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/therapy')
    .then(() => console.log('Connection successful'))
    .catch(e => console.log(e));
mongoose.set('strictQuery', true);

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.listen(PORT, () => {
    console.log('Serving on port 3000')
})