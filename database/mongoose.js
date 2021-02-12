require('../config/config')
const mongoose = require('mongoose')
mongoose.Promise= global.Promise
console.log(process.env.MONGO_URI)

mongoose.connect(
    process.env.MONGO_URI,
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