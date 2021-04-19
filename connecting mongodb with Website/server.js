let app = require("express")();                             //express module is loaded
let bodyParser = require("body-parser");                    // body-parsere
app.use(bodyParser.urlencoded({extended:true}));
let mongoClient = require("mongodb").MongoClient;           //mongo db is required
let url = "mongodb://localhost:27017"                           
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
// CRUD Operations are forwarded here
app.get("/addCourse.html",(req,res)=>{                                  
    res.sendFile(__dirname+"/addCourse.html");
})
app.get("/delete.html",(req,res)=>{
    res.sendFile(__dirname+"/delete.html");
})
app.get("/fetch.html",(req,res)=>{
    res.sendFile(__dirname+"/fetch.html");
})
app.get("/update.html",(req,res)=>{
    res.sendFile(__dirname+"/update.html");
})
app.post("/saveDetails",(req,res)=> {                       //data is stored
    

    let id = req.body.id;
        let name = req.body.name;
        let desc=req.body.desc
        let amount=req.body.amount
        
mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
if(!err1){
            let db = client.db("meanstack");
    db.collection("RegisteredCourses").insertOne({_id:id,CourseName:name,Description:desc,amount:amount},(err2,result)=>{
            if(!err2){
                console.log(result.insertedCount);
            }else {
                console.log(err2.message);
            }
            client.close();    
        });
        
    }
});
res.sendFile(__dirname+"/index.html")
        
})
app.post("/updateDetails",(req,res)=> {                 //data updated
    

        let id = req.body.id;
        let amount=req.body.amount
      
mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
if(!err1){
            let db = client.db("meanstack");
    db.collection("RegisteredCourses").updateOne({_id:id},{$set:{amount:amount}},(err2,result)=>{
        if(!err2){

            if(result.modifiedCount>0){
                 console.log("Data is stored")
            }else {
                 console.log("Data is not Updated");
            }
     }
            client.close();    
        });
        
    }
});
res.sendFile(__dirname+"/index.html")
        
})

app.post("/deleteDetails",(req,res)=> {                         //data is deleted
    

    let id = req.body.id;
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            db.collection("RegisteredCourses").deleteOne({_id:id},(err2,result)=> {
                if(!err2){
                       if(result.deletedCount>0){
                            console.log("Data Deleted!!!")
                       }else {
                            console.log("Data not Available !!!")
                       }
    
                }
                client.close();
            })           
        }
    })
    res.sendFile(__dirname+"/index.html")
})

app.get("/fetchDetails",(req,res)=> {                           //daat is fetched
    res.setHeader("content-type","text/html"); 
    var tinfo=  `<h1>List of Courses</h1>
            <table border="1">
            <tr>
            <th>Course Id</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Amount</th>`
            
    var obj1=[]
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
      if(!err1){
       let db = client.db("meanstack");
      let cursor = db.collection("RegisteredCourses").find().toArray(function(err, result) {
        if (err) throw err;
        console.log("Updated");
          console.log(result.length)
          for(let i=0;i<result.length;i++){
           obj1[i]=result[i]
          }
          console.log(obj1)
          for(let i=0;i<obj1.length;i++){
            tinfo+=`<tr>
                      <td>${obj1[i]._id}</td>
                      <td>${obj1[i].CourseName}</td>
                      <td>${obj1[i].Description}</td>
                      <td>${obj1[i].amount}</td>
                      </tr>`
        }
        tinfo+=`</table>`
        console.log("Data is fetched")
          res.send(tinfo)
      });
      
     
    

}
}) 
console.log(obj1) 


      console.log(tinfo)
       
})
app.listen(8000,()=>console.log("Server is Running on port number 8000"));