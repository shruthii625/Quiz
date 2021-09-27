exports.first = async function (db, data) {

return new Promise(function (resolve, reject) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("round1").deleteMany({}, (err, res) =>{
        if(!err){
            db.collection("round1").insertMany(data, (error, res) => {
                if (error) throw error;
                resolve(res)
            });
        }
        else{
            reject("not res");
        }
    });
    
});
    
}

exports.second = function (db) {

    return new Promise(function (resolve, reject) {
       
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round1").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
               
                reject("not res");
            }
        });
       
        
    });
}
exports.Round2insert =async function(db,data){
    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round2").deleteMany({}, (err, res) =>{
            if(!err){
                db.collection("round2").insertMany(data, (error, res) => {
                    if (error) throw error;
                    resolve(res)
                });
            }
            else{
                reject("not res");
            }
        });
        
    });
    }

exports.Round3insert = async function(db,data){
    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round3").deleteMany({}, (err, res) =>{
            if(!err){
                db.collection("round3").insertMany(data, (error, res) => {
                    if (error) throw error;
                    resolve(res)
                });
            }
            else{
                reject("not res");
            }
        });
        
    });
}
    

exports.getRound2Questions = function (db) {

    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round2").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                reject("not res");
            }
        });
       
        
    });
}


exports.getRound3Questions = function (db) {

    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round3").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                console.log("error");
                reject("not res");
            }
        });
       
        
    });
}

exports.insertStudentResponse = async function(db, data) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("studentresponse").insertOne(data, (err, res) =>{
        if (err) throw error;
    });
}

exports.getStudentResponse =  function (db) {

    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("studentresponse").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                console.log("error");
                reject("not res");
            }
        });
       
        
    });
}

exports.deleteStudentResponse = async function(db) {  return new Promise(function (resolve, reject) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("studentresponse").deleteMany({}, function(err,data){
        if(!err){
            resolve(data);
        }
        else{
            console.log("error");
            reject("not res");
        }
    });
});
}
    
