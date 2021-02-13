const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./database/mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const userRoutes = require('./routes/user.route')
app.use('/user',userRoutes)

app.get('/',(req,res)=>{
    res.render('index')
})
app.use((req,res,next)=>{
    const error = new Error('route not found')
    error.status = 404;
    next(error);
})
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})