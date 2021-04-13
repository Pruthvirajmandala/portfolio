let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    
    socket.on("chat",(msg)=> {
        console.log("\nHello "+msg.Name+"\n");
        console.log("\n Your message is "+msg.Message+"\n");
    })
})
http.listen(9000,()=>console.log('server running on port number 9000'));