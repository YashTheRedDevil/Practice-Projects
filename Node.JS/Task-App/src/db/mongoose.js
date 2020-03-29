const mongoose=require('mongoose');

const connectionURL=process.env.MONGODB_URL;
mongoose.connect(connectionURL,{useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true});