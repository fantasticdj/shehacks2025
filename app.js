const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const PORT = 3000;
const chat = require('./chatBot/gpt');

//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/therapy')
    .then(() => console.log('Connection successful'))
    .catch(e => console.log(e));
mongoose.set('strictQuery', true);

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

<<<<<<< HEAD
app.get('/', (req, res)=>{
    res.render('index')
=======
app.get('/', (req, res) =>{
    res.render('index');
})
app.get('/chat', (req, res) => {
    console.log(chat.completions("I am depressed"));
>>>>>>> 42010cc8a42790e1fa522c00c237a000440b5758
})

app.listen(PORT, () => {
    console.log('Serving on port 3000')
})