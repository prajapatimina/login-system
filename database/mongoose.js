require('../config/config')
const mongoose = require('mongoose')
mongoose.Promise= global.Promise
console.log(process.env.MONGO_URI)

mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.uz1e9.mongodb.net/login?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log('connected to database')
}).catch(err=>{
    console.log("not connected to database \n",err)
});

mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex',true)