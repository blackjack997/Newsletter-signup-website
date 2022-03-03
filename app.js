const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("Public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/Signup.html")
})

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    }

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/131ab37f66";

    const options = {
        method: "post",
        auth: "satwik1:2b1c8424d5f76946b5866af326a98f84-us14"
    }
    const request =  https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
       if (response.statusCode === 200){
           res.sendFile(__dirname + "/Success.html")
       }else{
           res.sendFile(__dirname + "/Failure.html")
       }
    })

    request.write(jsonData);
    request.end();

    console.log(firstName, lastName ,email);
})

app.post("/Failure.html", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running")
})


// API Key
// 2b1c8424d5f76946b5866af326a98f84-us14

// Audience ID
// 131ab37f66