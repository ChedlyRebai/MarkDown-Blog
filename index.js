const express=require('express')
const Article=require('./models/article')

const articlerouter=require('./routes/articles')
const methodOverride= require('method-override')


const mongoose=require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://user:user@cluster0.6zcerbm.mongodb.net/test',()=>console.log("connect"))


const app=express()
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.set('view engine','ejs')


app.get('/',async (req,res)=>{
    const articles= await Article.find().sort({
        creat:'desc'
    })
    
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articlerouter)
app.listen(3000,()=>{
    console.log("port listen");
})

