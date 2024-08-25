const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//routes
app.get('/',(req,res)=>{
    res.render("home");
});

app.post("/send-mail",(req,res)=>{
    const{sender,to,subject,body} = req.body;
    const transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Gmail SMTP server
        port: 587,              // SMTP port
        secure: false, 
        auth:{
            user:sender,
            pass:"gifo kxlz erqc kqvb"
        }
    });
    
    const mailOption = {
        from:sender,
        to:to,
        subject:subject,
        text:body
    };
    
    transpoter.sendMail(mailOption,(err,info)=>{
        if(err)
            console.log(err);
        else{
            console.log(`message sent: ${info.response}`);
        }
    })
    res.redirect("/");
});

app.listen(PORT,()=>{console.log(`started successfully at ${PORT}`)});