let fs=require("fs");
let obj = require("mongoose");  //load the module 
obj.Promise= global.Promise;       // creating the reference. 
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption ={       // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
obj.connect(url,mongooseDbOption);   //ready to connect 
let db = obj.connection;    // connected to database. 
db.on("error",(err)=>console.log(err));
db.once("open",()=>{

    //Defined the Schema 
    let callDataSchema = obj.Schema({
        _id : Number, 
        source : Number, 
        destination:Number, 
        sourceLocation:String, 
        destinationLocation:String, 
        callDuration:String, 
        roaming:String, 
        callCharge:String
    });
    // Creating Model using schema 
    let callData = obj.model("",callDataSchema,"calldata");
    
    //collecting data from json file
    let data = fs.readFileSync("callData.json");
    let callDataJSON=JSON.parse(data.toString());

    for(let data of callDataJSON){

    let c1 = new callData({
        "_id":data._id,
        "source":data.source,
        "destination":data.destination,
        "sourceLocation":data.sourceLocation,
        "destinationLocation":data.sourceLocation,
        "callDuration":data.callDuration,
        "roaming":data.roaming,
        "callCharge":data.callCharge

    });

    // Creating reference using model 
    c1.save((err,_result)=>{
        if(!err){
            console.log("call record inserted successfully. ")
        }else{
            console.log(err);
        }
        obj.disconnect();
       });
    }
})