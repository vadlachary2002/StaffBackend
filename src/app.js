const express =  require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors =  require('cors');

const app  = express();
const routes =  require('./routes');


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const corsOptions ={
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
  allowedHeaders: ['Content-Type','Authorization','x-csrf-token'],
}
app.use(cors(corsOptions));

app.use('/api',routes);
app.use('/',(req,res)=>{
  res.json({status:"home page"});
})
module.exports = app;