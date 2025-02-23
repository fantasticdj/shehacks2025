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

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(PORT, () => {
    console.log('Serving on port 3000')
})