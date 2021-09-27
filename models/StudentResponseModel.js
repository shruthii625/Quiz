const mongoose = require('mongoose');
var studentResponseSchema = new mongoose.Schema({
    Response:{
        type:String
    }
});

const StudentResponsemodel= mongoose.model('StudentResponse', studentResponseSchema);
module.exports =  StudentResponsemodel;