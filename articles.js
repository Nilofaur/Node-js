const express= require('express')

//creating Article model(table in db) -> exported articleSchema from article.js comes here
const Article=require('./models/article')
const Comment=require('./models/article')
const router=express.Router()




// catch(e) comes here 
router.get('/new',(req,res)=>
{
    console.log("articles/ => /new");
    //  {article: new Article() -> will send a blank default form 
    res.render('new', {article: new Article() })
});
//test route
router.get('/b',(req,res)=>
{
    console.log("article/b");
    res.json("route b")
});

//the redirected "`/articles/${article.id}`" comes here 
router.get('/:id', async (req,res)=>
{
    //findbyID is aync function
    console.log("i am at get/:id, articles/=> /id");
    //Now article has the data
    const article= await Article.findById(req.params.id)
    if (article==null) res.redirect('/')
    res.render('show',{article:article})
})



router.post('/',async (req,res)=>{
    // pass the options from the form (title, desc, markdown) but to access the options at post request, add "app.use(express.urlencoded({ extended: false }))" at server.js
    let article = new Article(
        {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        })
        try{
            //save() returns article id and save() is asyn function so add async, await
            // if no error then the new typed article in the browser can be updated at 'article' below  
           article = await article.save()
           console.log('i am at post try  block going to save  /articles/:id')
           //redirects to article/id after saving
           res.redirect(`/articles/${article.id}`)
         } catch (e)
         {
             console.log(e)
             //if failure comes here 
             //{article:article} -> will pre fill the entered data on the browser, ie)sent to the new.ejs to display it on the form
             res.render('new',{article:article})
         }

        
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })
  

//export this router (articles.js) to be used in server.js 
module.exports=router;