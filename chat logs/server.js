let app = require("express")();
let http = require("http").Server(app);
port=8000;
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"           //url to connect mongodb
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");    //url to connect mainpage
})  
io.on("connection", (socket) => {               //socket is turned on
    console.log("User Connected ...!");
    socket.on("chat", (data) => {
        var name = data.name;
        var msg = data.message;
        mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {

            if (!err1) {
                var log = {
                    "Name": name,
                    "Message": msg
                }
                console.log(data)
                let db = client.db("meanstack");                // meanstack is called
                db.collection("chatData").insertOne(data, (err2, result) => {           //data is stored here in to chatData in database
                    if (!err2) {
                        console.log(" Chat logs are stored in Database ");
                    } else {
                        console.log(err2.message);
                    }
                    client.close();
                });
            }
        })
    })

})

http.listen(port, () => console.log(`server running on port number ${port}`));