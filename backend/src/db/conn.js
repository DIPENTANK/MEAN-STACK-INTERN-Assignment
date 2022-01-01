const mongoose =require('mongoose');
const DB = 'mongodb+srv://dipen:admin123@cluster0.jimoz.mongodb.net/signup?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=> {
    console.log(`connection successful`);
}).catch((err)=>{
    console.log(`no connection`);
})