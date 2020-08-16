const express = require("express");
const app = express();
const  bodyParser = require("body-parser");
const PDFMerge = require('pdf-merge');
var multer  = require('multer');
const fs=require('fs');
const fse = require('fs-extra');

// const PDFMerger = require('pdf-merger-js');

// var merger = new PDFMerger();
var check=0;

var files=[];

let ejs = require('ejs');
const { dirname } = require("path");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
var upload = multer({ dest: __dirname+"/pdfs/" });

app.get("/",(req,res)=>{
    res.render("file",{hey:"wassup"});
});

app.post("/upload",upload.array('myfile1',12),(req,res)=>{
    
    for(var i=0;i<(req.files).length;i++){
        console.log("hey");
        file1= req.files[i].filename;
        fs.renameSync(__dirname+"/pdfs/"+file1,__dirname+"/pdfs/"+i+'.pdf');
        files[i] =  __dirname+"/pdfs/"+i+'.pdf';
        
    
    }
    
    PDFMerge(files, {output: `${__dirname}/pdfs/new.pdf`})
    .then((buffer) => {
        console.log("file merged");
    });
    

    // (async () => {
    //     for(var k=0;k<files.length;k++){

       
    //     merger.add(__dirname+"/"+k+".pdf");  //merge all pages. parameter is the path to file and filename.
    //   //  merger.add(__dirname+"/1.pdf");// merge only page 2
      
    //     }
    //     await merger.save('merged.pdf'); //save under given name
    //   })();
    
    console.log("file uploaded");
    res.render("sendile");
    

});

app.get("/upload",(req,res)=>{
    res.redirect("/");
});

app.get("/upload/download",(req,res)=>{
    res.download(__dirname+"/pdfs/new.pdf", 'new.pdf',()=>{
        // setTimeout(() => {
        //     for(var i=0;i<files.length;i++){
        //         console.log(files.length);
        //         fs.unlinkSync(__dirname+"/pdfs/"+i+".pdf");
        //         console.log("deleted");
        //         check=1;
    
        //     }
            
        // }, 4000);

       
    //    debugger;
    //    if(check){
    //     fs.unlinkSync(__dirname+"/pdfs/new.pdf");
    //     console.log("deleted");

    //    }

    fse.emptyDir(__dirname+"/pdfs");
       
        files=[];
      

    
       

    });

    
});


app.listen(5000,()=>{
    console.log("server started");
});
