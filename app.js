const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const PORT = 3000;
const flash = require('connect-flash');
const chat = require('./chatbot/ai');
const User = require('./models/mind_care');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//middleware
app.use(flash());
app.use(cookieParser('keyboard cat'));
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}));

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

//connect to database
const mongoose = require('mongoose');
const mind_care = require('./models/mind_care');
mongoose.connect('mongodb://127.0.0.1:27017/mind_care')
    .then(() => console.log('Connection successful'))
    .catch(e => console.log(e));
mongoose.set('strictQuery', true);


app.get('/', async (req, res) =>{
    res.render('index');
    let mindcare = await mind_care.findByIdAndUpdate('67b9d9d12dd7ed340c991077', {$unset: {comments: "", order: "", responses: "", history: ""}});
    mindcare = await mind_care.findByIdAndUpdate('67b9d9d12dd7ed340c991077', {$push: {responses: "How was your day?", order: "responses", history: "How was your day?"}})
})

async function chatCompletion(res, comment, next) {
    try {
        const mindcare2 = await mind_care.findById('67b9d9d12dd7ed340c991077')
        const response = await chat.completions(comment, mindcare2);
        const mindcare = await mind_care.findByIdAndUpdate('67b9d9d12dd7ed340c991077', {$push: { responses: response, order: "responses", history: response}} );

        res.render('chat', {mindcare2});
    } catch (e) {
        console.error(e);
        next(e);
    }
}

let response = "";
app.get('/chat', async (req, res, next) => {
    let comment = req.flash('comment')[0];
    let mindcare2 = await mind_care.findById('67b9d9d12dd7ed340c991077');
    if (comment){
        response = await chatCompletion(res, comment, next);
        comment = "";
    }else{
        res.render('chat', {mindcare2});
    }

})

app.get('/article', async (req, res, next) => {
    res.render('article');
})

app.post('/chat', async (req, res) => {
    const comment = req.body.comment;
    const mindcare = await mind_care.findByIdAndUpdate('67b9d9d12dd7ed340c991077', {$push: { comments: comment, order: "comments", history: comment}} );
    req.flash('comment', comment);
    res.redirect('/chat');
})

app.listen(PORT, () => {
    console.log('Serving on port 3000')
})