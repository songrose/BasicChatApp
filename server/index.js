//creating websocket server. 
var server = require('ws').Server;
var s = new server({port:5001});


//if there's a succesful connection, 
s.on('connection', function(ws){
    //fires when user from client side sends a message to the server
    ws.on('message', function(message){
        message = JSON.parse(message);
        if(message.type == "username"){
            ws.username = message.data;
        } 
        else{
            console.log("Received: " + message);
            s.clients.forEach(function e(client){
                //preventing myself from receiving back to data:
                if(client != ws) 
                client.send(JSON.stringify({
                    username:client.username,
                    data:message.data
                }));
            });
    }
    });

    //when client disconnects.
    ws.on('close',function(){
        console.log("client disc");
    });


    console.log("client connected");
});