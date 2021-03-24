//the exported Route() will be 'required' here at articlesRoute and whatever the path we give at articles.js (./articles(rel path)) will be stored in articlesRoute 
const articlesRoute=require('./articles');
// getting all the article (model from model/article.js) and storing it in const Article
const Article=require('./models/article')
const Comment=require('./models/article')
const express= require('express')

const app= express()
const mongoose = require('mongoose');
//to use delete
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/Ninjadb', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
app.set('view engine', 'ejs');

//app.set("views", "/views")

//to access all the parameters from the form, tell the express:
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))
app.use((req,res,next) =>
{
    console.log(req.path);
    next();

})

app.get('/', async (req,res)=>
{
    // displays all the articles created . pulls from 'Article' model 
   const articles= await Article.find().sort({createdAt:'desc'})
    res.render('index',  {articles:articles})
   
    
})

//Tell the server js to use articlesRoute and say where it is based on, meaning whatever we add to articlesRoute will be added after /articles
app.use('/articles',articlesRoute)

app.listen(5000)