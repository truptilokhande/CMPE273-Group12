const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
const routes = require('./routes');
require('dotenv').config();
const AWS = require("aws-sdk");
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const  QuestionModel = require("./models/questionModel");

const mongoose_uri = 'mongodb+srv://rootuser:rootuser@stackoverflow.ujcbz.mongodb.net/StackOverFlow?retryWrites=true&w=majority'
const connectionParams = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
mongoose.connect(mongoose_uri,connectionParams).then(()=>{
  console.info("MongoDB connected")
 

})
.catch((e) => {
  console.log("error connection to mongo")
})

const port = process.env.NODE_LOCAL_PORT || 8082;

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(fileupload());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret

app.use('/api', routes);



app.post("/addquestion", (req, res) => {

 userToken = req.body.userToken
 title = req.body.title 
 tags = req.body.tags
 questionbody = req.body.questionbody
 console.log(userToken,title,tags,questionbody)
 //item = {userTok:"2",title:title,tags:tags,questionbody:questionbody}
 QuestionModel.updateOne({userToken:"2"},{$set:{title:title,tags:tags,questionbody:questionbody}}, function(err, res) {
  if (err) throw err;
  else{
    console.log("1 document updated",res);
  }
  
//   db.close();

});
 
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});





module.exports = app;