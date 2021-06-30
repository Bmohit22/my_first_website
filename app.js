const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    var firstName = req.body.Fname;
    var lastName  = req.body.Lname;
    var email     = req.body.Email;
    var data = {
        members:[
            {email_address : email,
            status : "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }                    }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options = {
        url : "https://us6.api.mailchimp.com/3.0/lists/41211d0c90",
        method:"POST",
        headers:{
            "Authorization": "Mohit 16ba429838bdf35dbda7d46094539c4d-us6"
        },
        body: jsonData

    };

    request(options,function(error,response,body){
    if(error){
        res.sendFile(__dirname+"/failure.html");
        
    }else
        if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
        
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    });
    
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
//16ba429838bdf35dbda7d46094539c4d-us6
//41211d0c90