const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./database/mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.port || 3000
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
const userRoutes = require('./routes/user.route')
app.use('/user',userRoutes)

app.use((req,res,next)=>{
    const error = new Error('route not found')
    error.status = 404;
    next(error);
})