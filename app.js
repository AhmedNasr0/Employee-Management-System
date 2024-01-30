const express=require('express');
const expresslayout=require('express-ejs-layouts')
const path=require('path')
const ejs=require('ejs');
const mongodb=require('mongodb')
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const signroutes=require('./Routes/authentcation..routes')
const dashboardroutes=require('./Routes/dashboard.route')
const bodyparser=require('body-parser')
const cookie_parser=require('cookie-parser');
const env =require('dotenv')
env.config({path:'./config.env'});

mongoose.set("strictQuery", false);

//connect database
mongoose.connect(`${process.env.DATABASE_CONNECTION}`,()=>{
    console.log('database connected ')
})
app.use(cors())


app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src')))
app.use(cookie_parser())

//middleware to handle output
app.use(bodyparser.json())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:true}))
//routes
app.use('/auth',signroutes)
app.use('/',dashboardroutes)


const port=process.env.PORT||3000

app.listen(port,()=>{
    console.log(`local host :${port}`)
});